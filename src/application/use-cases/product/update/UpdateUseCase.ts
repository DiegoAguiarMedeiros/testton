
import { Description } from "../../../../domain/entities/product/Description";
import { Price } from "../../../../domain/entities/product/Price";
import { Quantity } from "../../../../domain/entities/product/Quantity";
import { IProductRepo } from "../../../../domain/repositories/product/ProductRepo";
import { AppError } from "../../../../domain/shared/core/AppError";
import { left, Result, right } from "../../../../domain/shared/core/Result";
import { UseCase } from "../../../../domain/shared/core/UseCase";
import { ProductMap } from "../../../../shared/mappers/ProductMap";
import { UpdateDTO } from "./UpdateDTO";
import { UpdateErrors } from "./UpdateErrors";
import { UpdateResponse } from "./UpdateResponse";


export class UpdateUseCase implements UseCase<UpdateDTO, Promise<UpdateResponse>> {
    private repo: IProductRepo;

    constructor(repo: IProductRepo) {
        this.repo = repo;
    }
    async execute(request: UpdateDTO): Promise<Promise<UpdateResponse>> {
        try {

            const productRaw = await this.repo.getById(request.id.toString(), request.userId.toString());
            if (!productRaw) {
                return left(
                    new UpdateErrors.NotFound(request.id.toString())
                ) as UpdateResponse;
            }

            const product = ProductMap.toDomain(productRaw);

            const DescriptionOrError = Description.create({ description: request.description ? request.description : product.description.value });
            DescriptionOrError.isFailure ? console.error(DescriptionOrError.getErrorValue()) : '';

            const PriceOrError = Price.create({ price: request.price ? request.price : product.price.value });
            PriceOrError.isFailure ? console.error(PriceOrError.getErrorValue()) : '';
            
            const QuantityOrError = Quantity.create({ quantity: request.quantity ? request.quantity : product.quantity.value });
            QuantityOrError.isFailure ? console.error(QuantityOrError.getErrorValue()) : '';


            const dtoResult = Result.combine([
                DescriptionOrError, PriceOrError,
            ]);

            if (dtoResult.isFailure) {
                return left(Result.fail<void>(dtoResult.getErrorValue())) as UpdateResponse;
            }

            const description: Description = DescriptionOrError.getValue();
            const price: Price = PriceOrError.getValue();
            const quantity: Quantity = QuantityOrError.getValue();




            if (request.description) product.updateDescription(description)
            if (request.price) product.updatePrice(price)
            if (request.quantity) product.updateQuantity(quantity)

            const updateProduct = await this.repo.update(request.id.toString(), request.userId.toString(), product);
            if (updateProduct) return right(Result.ok<void>()) as UpdateResponse;

            return left(
                new UpdateErrors.UpdateError(request.id.toString())
            ) as UpdateResponse;


        } catch (err) {
            return left(new AppError.UnexpectedError(err)) as UpdateResponse;
        }
    }

}
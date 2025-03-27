import { Description } from "../../../../domain/entities/product/Description";
import { Price } from "../../../../domain/entities/product/Price";
import { Product } from "../../../../domain/entities/product/Product";
import { Quantity } from "../../../../domain/entities/product/Quantity";
import { IProductRepo } from "../../../../domain/repositories/product/ProductRepo";
import { AppError } from "../../../../domain/shared/core/AppError";
import { Result, left, right } from "../../../../domain/shared/core/Result";
import { UseCase } from "../../../../domain/shared/core/UseCase";
import { Id } from "../../../../domain/shared/Id";
import { UniqueEntityID } from "../../../../domain/shared/UniqueEntityID";
import { CreateDTO } from "./CreateDTO";
import { CreateErrors } from "./CreateErrors";
import { CreateResponse } from "./CreateResponse";



export class CreateUseCase implements UseCase<CreateDTO, Promise<CreateResponse>> {
  private repo: IProductRepo;

  constructor(repo: IProductRepo) {
    this.repo = repo;
  }

  async execute(request: CreateDTO): Promise<CreateResponse> {

    const descriptionExist = await this.repo.getByDescription(request.description,request.userId);

    if (descriptionExist) {
      return left(
        new CreateErrors.DescriptionExist(request.description)
      ) as CreateResponse;
    }

    const DescriptionOrError = Description.create({ description: request.description });
    const PriceOrError = Price.create({ price: request.price });
    const QuantityOrError = Quantity.create({ quantity: request.quantity });
    const UserIdOrError = Id.create(new UniqueEntityID(request.userId));
    const IdOrError = Id.create(new UniqueEntityID());

    const dtoResult = Result.combine([
      DescriptionOrError, PriceOrError, UserIdOrError, IdOrError
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as CreateResponse;
    }

    const id: Id = IdOrError.getValue();
    const userId: Id = UserIdOrError.getValue();
    const description: Description = DescriptionOrError.getValue();
    const price: Price = PriceOrError.getValue();
    const quantity: Quantity = QuantityOrError.getValue();

    try {

      const productOrError: Result<Product> = Product.create({
        id,
        userId,
        description,
        price,
        quantity,
      });

      if (productOrError.isFailure) {
        return left(
          Result.fail<Product>(productOrError.getErrorValue().toString())
        ) as CreateResponse;
      }

      const product: Product = productOrError.getValue();

      await this.repo.save(product);

      return right(Result.ok<void>())

    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as CreateResponse;
    }
  }
}
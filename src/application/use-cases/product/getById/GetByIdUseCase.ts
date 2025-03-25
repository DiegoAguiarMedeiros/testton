import { Product } from "../../../../domain/entities/product/Product";
import { IProductRepo } from "../../../../domain/repositories/product/ProductRepo";
import { left, right, Result } from "../../../../domain/shared/core/Result";
import { UseCase } from "../../../../domain/shared/core/UseCase";
import { GetByIdDTOResquest } from "./GetByIdDTO";
import { GetByIdErrors } from "./GetByIdErrors";
import { GetByIdResponse } from "./GetByIdResponse";



export class GetByIdUseCase implements UseCase<GetByIdDTOResquest, Promise<GetByIdResponse>> {
    private repo: IProductRepo;
    constructor(repo: IProductRepo) {
        this.repo = repo;
    }
    async execute(request: GetByIdDTOResquest): Promise<GetByIdResponse> {
        const income = await this.repo.getById(request.Id.toString(), request.userId.toString());

        if (!income) {
            return left(
                new GetByIdErrors.NotFound(request.Id.toString())
            ) as GetByIdResponse;
        }

        return right(Result.ok<Product>(
            income
        ));
    }
}
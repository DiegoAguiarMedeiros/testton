
import { Product } from "../../../../domain/entities/product/Product";
import { IProductRepo } from "../../../../domain/repositories/product/ProductRepo";
import { left, Result, right } from "../../../../domain/shared/core/Result";
import { UseCase } from "../../../../domain/shared/core/UseCase";
import { Pagination } from "../../../../domain/shared/Pagination";
import { GetAllResponse } from "./GetAllResponse";


export class GetAllUseCase implements UseCase<{ id: string; page: number; pageSize: number, orderBy: string, order: string }, Promise<GetAllResponse>> {
    private repo: IProductRepo;

    constructor(repo: IProductRepo) {
        this.repo = repo;
    }
    async execute({ id, page, pageSize, orderBy, order }: { id: string; page: number; pageSize: number, orderBy: string, order: string }): Promise<GetAllResponse> {
        const productsPaged = await this.repo.getAll(id, page, pageSize, orderBy, order);
        const totalItems = (await this.repo.getAll(id)).length;


        const totalPages = Math.ceil(totalItems / pageSize);

        const paginationResult = Pagination.create<Product>({
            currentPage: page,
            pageSize,
            totalPages,
            totalItems,
            data: productsPaged,
        });

        if (paginationResult.isFailure) {
            return left(
                Result.fail<Pagination<Product>>(paginationResult.getErrorValue().toString())
            ) as GetAllResponse;
        }

        return right(Result.ok<Pagination<Product>>(
            paginationResult.getValue()
        ));
    }

}
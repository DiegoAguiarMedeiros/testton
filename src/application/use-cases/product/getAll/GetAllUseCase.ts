
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
        const [productsPaged, totalItems] = await Promise.all([
            this.repo.getAll(id, page, pageSize, orderBy, order),
            this.repo.getAll(id)
          ]);
          
          const totalItemsCount = totalItems.length;
          


        const totalPages = Math.ceil(totalItemsCount / pageSize);

        const paginationResult = Pagination.create<Product>({
            currentPage: page,
            pageSize,
            totalPages,
            totalItems:totalItemsCount,
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
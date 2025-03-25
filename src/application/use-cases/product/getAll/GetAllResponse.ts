import { Product } from "../../../../domain/entities/product/Product";
import { AppError } from "../../../../domain/shared/core/AppError";
import { Either, Result } from "../../../../domain/shared/core/Result";
import { Pagination } from "../../../../domain/shared/Pagination";


export type GetAllResponse = Either<
    AppError.UnexpectedError,
    Result<Pagination<Product>>
>
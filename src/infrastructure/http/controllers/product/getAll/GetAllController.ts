import { Response } from "express";
import { GetAllUseCase } from "../../../../../application/use-cases/product/getAll/GetAllUseCase";
import { BaseController } from "../../shared/BaseController";
import { DecodedExpressRequest } from "../../shared/DecodedExpressRequest";
import { Product } from "../../../../../domain/entities/product/Product";
import { ProductDTO } from "../../../../../domain/dto/ProductDTO";
import { ProductMap } from "../../../../../shared/mappers/ProductMap";
import { PaginationDTO } from "../../../../../domain/dto/PaginationDTO";


export class GetAllController extends BaseController {
    private useCase: GetAllUseCase;

    constructor(useCase: GetAllUseCase) {
        super();
        this.useCase = useCase;
    }
    protected async executeImpl(req: DecodedExpressRequest, res: Response): Promise<any> {
        try {
            const { id } = req.decoded;

            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 10;
            const orderBy = `${req.query.orderBy}` ;
            const order = `${req.query.order}`;

            const result = await this.useCase.execute({ id, page, pageSize,orderBy,order });

            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    default:
                        return this.fail(res,
                            error.getErrorValue() === undefined ?
                                String(error.getErrorValue()) :
                                error.getErrorValue().message === undefined ? String(error.getErrorValue()) : error.getErrorValue().message);
                }
            } else {
                const products: PaginationDTO<Product> = result.value.getValue();
                return this.ok<PaginationDTO<ProductDTO>>(res, {
                    currentPage: products.currentPage,
                    pageSize: products.pageSize,
                    totalItems: products.totalItems,
                    totalPages: products.totalPages,
                    data: products.data.map((income: any) => ProductMap.toDTO(income)),
                });
            }

        } catch (err) {
            return this.fail(res, err as string | Error)
        }
    }

}

import { IProductRepo } from "../../../../domain/repositories/product/ProductRepo";
import { AppError } from "../../../../domain/shared/core/AppError";
import { left, right, Result } from "../../../../domain/shared/core/Result";
import { UseCase } from "../../../../domain/shared/core/UseCase";
import { DeleteDTO } from "./DeleteDTO";
import { DeleteErrors } from "./DeleteErrors";
import { DeleteResponse } from "./DeleteResponse";



export class DeleteUseCase implements UseCase<DeleteDTO, Promise<DeleteResponse>> {
    private repo: IProductRepo;

    constructor(repo: IProductRepo) {
        this.repo = repo;
    }
    async execute(request: DeleteDTO): Promise<DeleteResponse> {

        try {
            const creditCard = await this.repo.getById(request.id.toString(), request.userId.toString());

            if (!creditCard) {
                return left(
                    new DeleteErrors.NotFound(request.id.toString())
                ) as DeleteResponse;
            }

            await this.repo.delete(request.id.toString());
            return right(Result.ok<void>()) as DeleteResponse;

        } catch (err) {
            return left(new AppError.UnexpectedError(err)) as DeleteResponse;
        }
    }

}
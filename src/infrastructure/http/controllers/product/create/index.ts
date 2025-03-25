
import { CreateUseCase } from "../../../../../application/use-cases/product/create/CreateUseCase";
import { productsRepo } from "../../../../../domain/repositories";
import { CreateController } from "./CreateController";

const createProductUseCase = new CreateUseCase(productsRepo);
const createProductController = new CreateController(
    createProductUseCase
)

export {
    createProductUseCase,
    createProductController
}
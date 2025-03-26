
import { GetAllUseCase } from "../../../../../application/use-cases/product/getAll/GetAllUseCase";
import { productsRepo } from "../../../../../domain/repositories";
import { GetAllController } from "./GetAllController";

const getAllProductUseCase = new GetAllUseCase(productsRepo);
const getAllProductController = new GetAllController(getAllProductUseCase);

export { getAllProductController }

import { GetAllUseCase } from "../../../../../application/use-cases/product/getAll/GetAllUseCase";
import { productsRepo } from "../../../../../domain/repositories";
import { GetAllController } from "./GetAllController";

const getAllIncomeUseCase = new GetAllUseCase(productsRepo);
const getAllIncomeController = new GetAllController(getAllIncomeUseCase);

export { getAllIncomeController, getAllIncomeUseCase }
import { GetByIdUseCase } from '../../../../../application/use-cases/product/getById/GetByIdUseCase';
import { productsRepo } from '../../../../../domain/repositories';
import { GetByIdController } from './GetByIdController'

const getIncomeByIdUseCase = new GetByIdUseCase(productsRepo);
const getIncomeByIdController = new GetByIdController(getIncomeByIdUseCase);

export { getIncomeByIdController }
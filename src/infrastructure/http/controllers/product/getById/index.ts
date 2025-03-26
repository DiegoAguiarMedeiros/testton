import { GetByIdUseCase } from '../../../../../application/use-cases/product/getById/GetByIdUseCase';
import { productsRepo } from '../../../../../domain/repositories';
import { GetByIdController } from './GetByIdController'

const getProductByIdUseCase = new GetByIdUseCase(productsRepo);
const getProductByIdController = new GetByIdController(getProductByIdUseCase);

export { getProductByIdController }
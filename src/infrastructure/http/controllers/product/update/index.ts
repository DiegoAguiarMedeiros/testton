import { UpdateUseCase } from '../../../../../application/use-cases/product/update/UpdateUseCase'
import { productsRepo } from '../../../../../domain/repositories';
import { UpdateController } from './UpdateController';

const updatedProductUseCase = new UpdateUseCase(productsRepo);
const updatedProductController = new UpdateController(updatedProductUseCase);

export { updatedProductController }
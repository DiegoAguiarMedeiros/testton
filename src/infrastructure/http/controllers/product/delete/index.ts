import { DeleteUseCase } from '../../../../../application/use-cases/product/delete/DeleteUseCase';
import { productsRepo } from '../../../../../domain/repositories';
import { DeleteController } from './DeleteController'
const deleteProductUseCase = new DeleteUseCase(productsRepo);
const deleteProductController = new DeleteController(deleteProductUseCase);

export { deleteProductController }
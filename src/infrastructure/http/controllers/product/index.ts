import { createProductController } from '../../controllers/product/create';
import { getAllProductController } from '../../controllers/product/getAll';
import { getProductByIdController } from '../../controllers/product/getById';
import { deleteProductController } from '../../controllers/product/delete';
import { updatedProductController } from '../../controllers/product/update';


const productController = {
    create:createProductController,
    getAll:getAllProductController,
    get:getProductByIdController,
    delete:deleteProductController,
    update:updatedProductController,
}

export default productController;
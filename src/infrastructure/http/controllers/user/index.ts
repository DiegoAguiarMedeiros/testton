import { createUserController } from './create';
import { getUserController } from './get';
import { loginController } from './login';


const userController = {
    create:createUserController,
    get:getUserController,
    login:loginController,
}

export default userController;
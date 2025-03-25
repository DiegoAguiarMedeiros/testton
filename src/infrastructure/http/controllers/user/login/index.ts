
import { LoginUseCase } from "../../../../../application/use-cases/user/login/LoginUseCase";
import { userRepo } from "../../../../../domain/repositories";
import { authService } from "../../../../services";
import { LoginController } from "./LoginController";

const loginUseCase = new LoginUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase }
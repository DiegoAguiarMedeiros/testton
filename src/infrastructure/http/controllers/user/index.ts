
import { CreateUseCase } from "../../../../application/use-cases/user/create/CreateUseCase";
import { userRepo } from "../../../../domain/repositories/user";
import { CreateController } from "./CreateController";

const createUserUseCase = new CreateUseCase(userRepo);
const createUserController = new CreateController(
  createUserUseCase
)

export {
  createUserController
}
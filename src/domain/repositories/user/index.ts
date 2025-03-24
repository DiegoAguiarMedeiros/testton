
import models from "../../../infrastructure/database/models";
import { UserRepo } from "./implementations/userRepo";

const userRepo = new UserRepo(models);

export { userRepo }

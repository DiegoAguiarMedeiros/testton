
import models from "../../infrastructure/database/models";
import  UserRepo  from "./user/implementations";
import  ProductsRepo  from "./product/implementations";

const userRepo = new UserRepo(models);
const productsRepo = new ProductsRepo(models);

export { userRepo,productsRepo }

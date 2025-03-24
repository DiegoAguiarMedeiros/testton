import { Email } from "../../entities/User/Email";
import { User } from "../../entities/User/User";


export interface IUserRepo {
  exists(email: Email): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByEmail(email: Email): Promise<User>;
  save(user: User): Promise<void>;
}
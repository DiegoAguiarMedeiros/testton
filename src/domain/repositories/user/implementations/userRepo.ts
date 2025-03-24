
import { UserMap } from "../../../../shared/mappers/userMap";
import { Email } from "../../../entities/User/Email";
import { User } from "../../../entities/User/User";
import { IUserRepo } from "../userRepo";

export class UserRepo implements IUserRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async exists(email: Email): Promise<boolean> {
        const userModel = this.models.Users;
        const user = await userModel.findOne({
            where: {
                email: email.value
            }
        });
        return !!user === true;
    }

    async getUserByEmail(email: Email): Promise<User> {
        const userModel = this.models.Users;
        const user = await userModel.findOne({
            where: {
                email: email.value
            }
        });
        if (!!user === false) throw new Error("User not found.")
        return UserMap.toDomain(user);
    }

    async getUserByUserId(userId: string): Promise<User> {
        const userModel = this.models.Users;
        const user = await userModel.findOne({
            where: {
                base_user_id: userId
            }
        });
        if (!!user === false) throw new Error("User not found.")
        return UserMap.toDomain(user);
    }

    async save(user: User): Promise<void> {
        const UserModel = this.models.Users;
        const exists = await this.exists(user.email);

        if (!exists) {
            const rawUser = await UserMap.toPersistence(user);
            await UserModel.create(rawUser);
        }

        return;
    }
}
import { UserDTO } from "../../domain/dto/UserDTO";
import { Email } from "../../domain/entities/user/Email";
import { Name } from "../../domain/entities/user/Name";
import { Password } from "../../domain/entities/user/Password";
import { User } from "../../domain/entities/user/User";
import { Id } from "../../domain/shared/Id";
import { UniqueEntityID } from "../../domain/shared/UniqueEntityID";
import { Mapper } from "./Mapper";

export class UserMap implements Mapper<User> {
  public static toDTO(user: User): UserDTO {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
    };
  }

  public static toDomain(raw: any): User {

    const IdOrError = Id.create(new UniqueEntityID(raw.id));
    if (!raw.id) {
      throw new Error(`id is null or undefined`);
    }

    const NameOrError = Name.create({ name: raw.name });
    if (NameOrError.isFailure) {
      throw new Error(`${NameOrError.getErrorValue()}`);
    }

    const PasswordOrError = Password.create({
      value: raw.password,
      hashed: true,
    });
    if (PasswordOrError.isFailure) {
      throw new Error(`${PasswordOrError.getErrorValue()}`);
    }
    
    const EmailOrError = Email.create(raw.email);
    if (EmailOrError.isFailure) {
      throw new Error(`${EmailOrError.getErrorValue()}`);
    }


    const userOrError = User.create(
      {
        id: IdOrError.getValue(),
        name: NameOrError.getValue(),
        password: PasswordOrError.getValue(),
        email: EmailOrError.getValue(),
      }
    );

    userOrError.isFailure ? console.error(userOrError.getErrorValue()) : '';

    return userOrError.getValue();
    
  }

  public static async toPersistence(user: User): Promise<any> {
    let password: string = '';
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }
    return {
      id: user.id.value,
      email: user.email.value,
      name: user.name.value,
      password: password,
    };
  }
}

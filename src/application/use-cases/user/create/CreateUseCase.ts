import { AppError } from "../../../../domain/shared/core/AppError";
import { Either, Result, left, right } from "../../../../domain/shared/core/Result";
import { UseCase } from "../../../../domain/shared/core/UseCase";
import { Id } from "../../../../domain/shared/Id";
import { Email } from "../../../../domain/entities/User/Email";
import { Name } from "../../../../domain/entities/User/Name";
import { Password } from "../../../../domain/entities/User/Password";
import { User } from "../../../../domain/entities/User/User";
import { CreateDTO } from "./CreateDTO";
import { CreateErrors } from "./CreateErrors";
import { IUserRepo } from "../../../../domain/repositories/user/userRepo";
import { CreateResponse } from "./CreateResponse";

export class CreateUseCase implements UseCase<CreateDTO, Promise<CreateResponse>> {
  private repo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.repo = repo;
  }

  async execute(request: CreateDTO): Promise<CreateResponse> {
    const idOrError = Id.create(request.id);
    const emailOrError = Email.create(request.email);
    const passwordOrError = Password.create({ value: request.password });
    const nameOrError = Name.create({ name: request.name });

    const dtoResult = Result.combine([
      emailOrError, passwordOrError, nameOrError, idOrError
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as CreateResponse;
    }

    const id: Id = idOrError.getValue();
    const email: Email = emailOrError.getValue();
    const password: Password = passwordOrError.getValue();
    const name: Name = nameOrError.getValue();

    try {
      const userAlreadyExists = await this.repo.exists(email);

      if (userAlreadyExists) {
        return left(
          new CreateErrors.EmailAlreadyExistsError(email.value)
        ) as CreateResponse;
      }

      const userOrError: Result<User> = User.create({
        email, password, name, id
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.getErrorValue().toString())
        ) as CreateResponse;
      }

      const user: User = userOrError.getValue();


      await this.repo.save(user);

      return right(Result.ok<void>())

    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as CreateResponse;
    }
  }
}
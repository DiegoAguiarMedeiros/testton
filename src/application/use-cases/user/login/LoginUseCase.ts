import { Email } from "../../../../domain/entities/user/Email";
import { JWTToken, RefreshToken } from "../../../../domain/entities/user/Jwt";
import { Password } from "../../../../domain/entities/user/Password";
import { User } from "../../../../domain/entities/user/User";
import { IUserRepo } from "../../../../domain/repositories/user/IUserRepo";
import { AppError } from "../../../../domain/shared/core/AppError";
import {  Result, left, right } from "../../../../domain/shared/core/Result";
import { UseCase } from "../../../../domain/shared/core/UseCase";
import { IAuthService } from "../../../../infrastructure/services/authService";
import { LoginDTOResponse, LoginDTO } from "./LoginDTO";
import { LoginUseCaseErrors } from "./LoginErrors";
import { LoginResponse } from "./LoginResponse";


export class LoginUseCase implements UseCase<LoginDTO, Promise<LoginResponse>> {
  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService
  }

  public async execute(request: LoginDTO): Promise<LoginResponse> {
    let user: User;
    let email: Email;
    let password: Password;

    try {

      const emailOrError = Email.create(request.email);
      const passwordOrError = Password.create({ value: request.password });
      const payloadResult = Result.combine([emailOrError, passwordOrError]);
      if (payloadResult.isFailure) {
        return left(Result.fail<any>(payloadResult.getErrorValue()))
      }

      email = emailOrError.getValue();
      password = passwordOrError.getValue();

      try {
        user = await this.userRepo.getUserByEmail(email);
        const userFound = !!user;

        if (!userFound) {
          return left(new LoginUseCaseErrors.EmailDoesntExistError())
        }
        const passwordValid = await user.password.comparePassword(password.value);

        if (!passwordValid) {
          return left(new LoginUseCaseErrors.EmailDoesntExistError())
        }



        const accessToken: JWTToken = this.authService.signJWT({
          name: user.name.value,
          email: user.email.value,
          id: user.id.value,
        });

        const refreshToken: RefreshToken = this.authService
          .createRefreshToken();

        user.setAccessToken(accessToken, refreshToken);

        
        await this.authService.saveAuthenticatedUser(user);

        return right(Result.ok<LoginDTOResponse>({
          accessToken,
          refreshToken
        }));
      } catch (error) {
        return left(new LoginUseCaseErrors.EmailDoesntExistError())
      }
    } catch (err) {
      if (err instanceof Error) {
        return left(new AppError.UnexpectedError("LoginUserUseCase: " + err.message));
      }
      return left(new AppError.UnexpectedError('LoginUserUseCase An unexpected error occurred'));
    }
  }
}
import { Email } from "./Email";
import { Name } from "./Name";
import { Password } from "./Password";
import { JWTToken, RefreshToken } from "./Jwt";
import { Guard } from "../../shared/core/Guard";
import { Result } from "../../shared/core/Result";
import { Id } from "../../shared/Id";

interface UserProps {
  id: Id,
  email: Email;
  name: Name;
  password: Password;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  lastLogin?: Date;
}

export class User {
  private props: UserProps;

  get id(): Id {
    return this.props.id;
  }
  get email(): Email {
    return this.props.email;
  }

  get name(): Name {
    return this.props.name;
  }

  get password(): Password {
    return this.props.password;
  }

  get accessToken(): string {
    return this.props.accessToken ?? '';
  }


  get lastLogin(): Date {
    return this.props.lastLogin ?? new Date('1900-01-01T00:00:00Z');
  }

  get refreshToken(): RefreshToken {
    return this.props.refreshToken ?? '';
  }

  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  private constructor(props: UserProps) {
    this.props = props;
  }

  public static create(props: UserProps): Result<User> {

    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "name" },
      { argument: props.email, argumentName: "email" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>('User :' + guardResult.getErrorValue());
    }

    const user = new User(
      {
        ...props,
      }
    );

    return Result.ok<User>(user);
  }
}
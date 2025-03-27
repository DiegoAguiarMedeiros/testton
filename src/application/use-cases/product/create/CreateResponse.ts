
import { AppError } from "../../../../domain/shared/core/AppError";
import { Either, Result } from "../../../../domain/shared/core/Result";
import { CreateErrors } from "./CreateErrors";

export type CreateResponse = Either<
  CreateErrors.DescriptionExist |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>
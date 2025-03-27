import { Result } from "../../../../domain/shared/core/Result";
import { UseCaseError } from "../../../../domain/shared/core/UseCaseError";


export namespace CreateErrors {

  export class DescriptionExist extends Result<UseCaseError> {
    constructor(name: string) {
      super(false, {
        message: `The description '${name}' already exist`
      } as UseCaseError)
    }
  }


}
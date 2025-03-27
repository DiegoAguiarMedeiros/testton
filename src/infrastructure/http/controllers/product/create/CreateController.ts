import * as express from 'express'
import { CreateDTO } from "../../../../../application/use-cases/product/create/CreateDTO";
import { CreateErrors } from "../../../../../application/use-cases/product/create/CreateErrors";
import { CreateUseCase } from "../../../../../application/use-cases/product/create/CreateUseCase";
import { TextUtils } from "../../../../../shared/TextUtils";
import { BaseController } from "../../shared/BaseController";
import { DecodedExpressRequest } from "../../shared/DecodedExpressRequest";


export class CreateController extends BaseController {

  private useCase: CreateUseCase;

  constructor(useCase: CreateUseCase) {
    super();
    this.useCase = useCase;
  }


  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    let dto: CreateDTO = req.body as CreateDTO;
    const { id } = req.decoded;
    dto = {
      ...dto,
      userId: id,
      description: TextUtils.sanitize(dto.description),
    }
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateErrors.DescriptionExist:
            return this.conflict(res, error.getErrorValue())
          default:
            return this.fail(res, error.getErrorValue());
        }

      } else {
        return this.ok(res);
      }

    } catch (err) {
      return this.fail(res, err as string | Error)
    }

  }

}
import { Guard } from "../../shared/core/Guard";
import { Result } from "../../shared/core/Result";
import { ValueObject } from "../../shared/ValueObject";



interface QuantityProps {
  quantity: number;
}

export class Quantity extends ValueObject<QuantityProps> {

  get value(): number {
    return this.props.quantity;
  }

  private constructor(props: QuantityProps) {
    super(props);
  }

  public static create(props: QuantityProps): Result<Quantity> {
    const quantityResult = Guard.againstNullOrUndefined(props.quantity, 'quantity');
    if (quantityResult.isFailure) {
      return Result.fail<Quantity>(quantityResult.getErrorValue())
    }


    return Result.ok<Quantity>(new Quantity(props));
  }
}
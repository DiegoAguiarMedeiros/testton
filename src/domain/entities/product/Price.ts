import { Guard } from "../../shared/core/Guard";
import { Result } from "../../shared/core/Result";
import { ValueObject } from "../../shared/ValueObject";



interface PriceProps {
  price: number;
}

export class Price extends ValueObject<PriceProps> {

  get value(): number {
    return this.props.price;
  }

  private constructor(props: PriceProps) {
    super(props);
  }

  public static create(props: PriceProps): Result<Price> {
    const priceResult = Guard.againstNullOrUndefined(props.price, 'price');
    if (priceResult.isFailure) {
      return Result.fail<Price>(priceResult.getErrorValue())
    }


    return Result.ok<Price>(new Price(props));
  }
}
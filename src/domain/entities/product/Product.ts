import { Guard } from "../../shared/core/Guard";
import { Result } from "../../shared/core/Result";
import { Id } from "../../shared/Id";
import { Description } from "./Description";
import { Price } from "./Price";
import { Quantity } from "./Quantity";


interface ProductProps {
  id: Id;
  userId: Id;
  description: Description;
  price: Price;
  quantity: Quantity;
}


export class Product {
  private props: ProductProps;

  get id(): Id {
    return this.props.id;
  }
  get userId(): Id {
    return this.props.userId;
  }
  get description(): Description {
    return this.props.description;
  }
  public updateDescription(description: Description): void {
    this.props.description = description;
  }
  get price(): Price {
    return this.props.price;
  }
  public updatePrice(price: Price): void {
    this.props.price = price;
  }
  get quantity(): Quantity {
    return this.props.quantity;
  }
  public updateQuantity(quantity: Quantity): void {
    this.props.quantity = quantity;
  }

  private constructor(props: ProductProps) {
    this.props = props;
  }

  public static create(props: ProductProps): Result<Product> {

    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.id, argumentName: "id" },
      { argument: props.userId, argumentName: "userId" },
      { argument: props.description, argumentName: "description" },
      { argument: props.price, argumentName: "price" },
      { argument: props.quantity, argumentName: "quantity" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Product>('Product :' + guardResult.getErrorValue());
    }

    const product = new Product(
      {
        ...props
      }
    );

    return Result.ok<Product>(product);
  }
}

import { ProductDTO } from "../../domain/dto/ProductDTO";
import { Description } from "../../domain/entities/product/Description";
import { Price } from "../../domain/entities/product/Price";
import { Product } from "../../domain/entities/product/Product";
import { Quantity } from "../../domain/entities/product/Quantity";
import { Id } from "../../domain/shared/Id";
import { Mapper } from "./Mapper";

export class ProductMap implements Mapper<Product> {
  public static toDTO(product: Product): ProductDTO {
    return {
      id: product.id.value,
      userId: product.userId.value,
      description: product.description.value,
      price: product.price.value,
      quantity: product.quantity.value,
    };
  }

  public static toDomain(raw: any): Product {
    const DescriptionOrError = Description.create({ description: raw.description });
    DescriptionOrError.isFailure ? console.error(DescriptionOrError.getErrorValue()) : '';

    const PriceOrError = Price.create({ price: raw.price });
    PriceOrError.isFailure ? console.error(PriceOrError.getErrorValue()) : '';
    
    const QuantityOrError = Quantity.create({ quantity: raw.quantity });
    QuantityOrError.isFailure ? console.error(QuantityOrError.getErrorValue()) : '';

    const UserIdOrError = Id.create(raw.user_id);
    UserIdOrError.isFailure ? console.error(UserIdOrError.getErrorValue()) : '';

    const IdOrError = Id.create(raw.id);
    IdOrError.isFailure ? console.error(IdOrError.getErrorValue()) : '';

    const debtOrError = Product.create(
      {
        id: IdOrError.getValue(),
        userId: UserIdOrError.getValue(),
        description: DescriptionOrError.getValue(),
        price: PriceOrError.getValue(),
        quantity: QuantityOrError.getValue(),
      }
    );

    debtOrError.isFailure ? console.error(debtOrError.getErrorValue()) : '';

    return debtOrError.getValue();
  }

  public static async toPersistence(product: Product): Promise<any> {

    return {
      id: product.id.value,
      user_id: product.userId.value,
      description: product.description.value,
      price: product.price.value,
      quantity: product.quantity.value,
    };
  }
}

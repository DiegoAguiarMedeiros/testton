import { ProductDTO } from "../../domain/dto/ProductDTO";
import { Description } from "../../domain/entities/product/Description";
import { Price } from "../../domain/entities/product/Price";
import { Product } from "../../domain/entities/product/Product";
import { Quantity } from "../../domain/entities/product/Quantity";
import { Id } from "../../domain/shared/Id";
import { UniqueEntityID } from "../../domain/shared/UniqueEntityID";
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
    if (DescriptionOrError.isFailure) {
      throw new Error(`${DescriptionOrError.getErrorValue()}`);
    }

    const PriceOrError = Price.create({ price: raw.price });
    if (PriceOrError.isFailure) {
      throw new Error(`${PriceOrError.getErrorValue()}`);
    }
    
    const QuantityOrError = Quantity.create({ quantity: raw.quantity });
    if (QuantityOrError.isFailure) {
      throw new Error(`${QuantityOrError.getErrorValue()}`);
    }

    const UserIdOrError = Id.create(new UniqueEntityID(raw.user_id));
    if (!raw.user_id) {
      throw new Error(`user_id is null or undefined`);
    }

    const IdOrError = Id.create(new UniqueEntityID(raw.id));
    if (!raw.id) {
      throw new Error(`id is null or undefined`);
    }

    const productOrError = Product.create(
      {
        id: IdOrError.getValue(),
        userId: UserIdOrError.getValue(),
        description: DescriptionOrError.getValue(),
        price: PriceOrError.getValue(),
        quantity: QuantityOrError.getValue(),
      }
    );

    productOrError.isFailure ? console.error(productOrError.getErrorValue()) : '';

    return productOrError.getValue();
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

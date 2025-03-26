import { describe, expect, test } from "@jest/globals";
import { Description } from '../../domain/entities/product/Description';
import { Price } from '../../domain/entities/product/Price';
import { Quantity } from '../../domain/entities/product/Quantity';
import { Product } from '../../domain/entities/product/Product';
import { Id } from '../../domain/shared/Id';
import { UniqueEntityID } from '../../domain/shared/UniqueEntityID';
import { ProductMap } from '../../shared/mappers/ProductMap';
import { ProductDTO } from '../../domain/dto/ProductDTO';


describe("ProductMap", () => {
  describe("toDTO", () => {
    it("should Product maper to ProductDTO", () => {

      const IdOrError = Id.create(new UniqueEntityID('7b0ec344-5da1-4501-8747-2db62f221492'));
      const UserIdOrError = Id.create(new UniqueEntityID('7b0ec344-5da1-4501-8747-2db62f221493'));
      const DescriptionOrError = Description.create({ description: "test" });
      const PriceOrError = Price.create({ price: 67 });
      const QuantityOrError = Quantity.create({ quantity: 1 });

      const userOrError = Product.create({
        id: IdOrError.getValue(),
        userId: UserIdOrError.getValue(),
        description: DescriptionOrError.getValue(),
        price: PriceOrError.getValue(),
        quantity: QuantityOrError.getValue(),
      });

      const productDTO: ProductDTO = ProductMap.toDTO(userOrError.getValue());

      expect(productDTO).toStrictEqual({
        id: "7b0ec344-5da1-4501-8747-2db62f221492",
        userId: "7b0ec344-5da1-4501-8747-2db62f221493",
        description: "test",
        price: 67,
        quantity: 1,
      });
    });
  });

  describe("toDomain", () => {

    it("should ProductDTO maper to Domain", () => {
      const productDTO: any = {
        id: "7b0ec344-5da1-4501-8747-2db62f221492",
        user_id: "7b0ec344-5da1-4501-8747-2db62f221493",
        description: "test",
        price: 1,
        quantity: 2,
      };

      const user: Product = ProductMap.toDomain(productDTO);

      expect(user.id.value).toMatch(/^[a-f0-9-]{36}$/);
      expect(user.userId.value).toMatch(/^[a-f0-9-]{36}$/);
      expect(user.description.value).toBe("test");
      expect(user.price.value).toBe(1);
      expect(user.quantity.value).toBe(2);
    });

    it("should return error for UserId is null", () => {
      const rawProduct = {
        description: "test",
        price: 1,
        quantity: 2
      };
      expect(() => {
        ProductMap.toDomain(rawProduct);
      }).toThrow('user_id is null or undefined');
    });

    it("should return error for UserId is null", () => {
      const rawProduct = {
        user_id: "7b0ec344-5da1-4501-8747-2db62f221493",
        description: "test",
        price: 1,
        quantity: 2,
      };
      expect(() => {
        ProductMap.toDomain(rawProduct);
      }).toThrow('id is null or undefined');
    });

    it("should return error for Description is null", () => {
      const rawProduct = {
        price: 1,
        quantity: 2
      };
      expect(() => {
        ProductMap.toDomain(rawProduct);
      }).toThrow('description is null or undefined');
    });

    it("should return error for price is null", () => {
      const rawProduct = {
        description: "test",
        quantity: 1,
      };

      expect(() => {
        ProductMap.toDomain(rawProduct);
      }).toThrow('price is null or undefined');
    });

    it("should return error for quantity is null", () => {
      const rawProduct = {
        description: "test",
        price: 1,
      };

      expect(() => {
        ProductMap.toDomain(rawProduct);
      }).toThrow('quantity is null or undefined');
    });
  });

  describe("toPersistence", () => {
    it("should correctly map a Product object to persistence format", async () => {
      const IdOrError = Id.create(new UniqueEntityID('7b0ec344-5da1-4501-8747-2db62f221492'));
      const UserIdOrError = Id.create(new UniqueEntityID('7b0ec344-5da1-4501-8747-2db62f221493'));
      const DescriptionOrError = Description.create({ description: "test" });
      const PriceOrError = Price.create({ price: 67 });
      const QuantityOrError = Quantity.create({ quantity: 1 });

      const userOrError = Product.create({
        id: IdOrError.getValue(),
        userId: UserIdOrError.getValue(),
        description: DescriptionOrError.getValue(),
        price: PriceOrError.getValue(),
        quantity: QuantityOrError.getValue(),
      });
      const persistenceData = await ProductMap.toPersistence(
        userOrError.getValue()
      );

      expect(persistenceData).toStrictEqual({
        id: userOrError.getValue().id.value,
        user_id: userOrError.getValue().userId.value,
        description: userOrError.getValue().description.value,
        price: userOrError.getValue().price.value,
        quantity: userOrError.getValue().quantity.value,
      });
    });

  });
});

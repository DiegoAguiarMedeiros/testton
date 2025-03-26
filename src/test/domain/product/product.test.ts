import { describe, expect, test, it } from "@jest/globals";
import { Description } from '../../../domain/entities/product/Description';
import { Price } from '../../../domain/entities/product/Price';
import { Quantity } from '../../../domain/entities/product/Quantity';
import { Product } from '../../../domain/entities/product/Product';
import { Id } from '../../../domain/shared/Id';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { ProductMap } from '../../../shared/mappers/ProductMap';
import { ProductDTO } from '../../../domain/dto/ProductDTO';

describe("Product", () => {
  const validProductProps = {
    id: Id.create(new UniqueEntityID('7b0ec344-5da1-4501-8747-2db62f221492')).getValue(),
    userId: Id.create(new UniqueEntityID('7b0ec344-5da1-4501-8747-2db62f221493')).getValue(),
    description: Description.create({description:'Test'}).getValue(),
    price: Price.create({price:1}).getValue(),
    quantity: Quantity.create({quantity:1}).getValue(),
  };

  it("should create product", () => {
    const ProductOrError = Product.create(validProductProps);
    expect(ProductOrError.isSuccess).toBe(true);
  });

  it("should update description product", () => {
    const ProductOrError = Product.create(validProductProps);
    const product = ProductOrError.getValue();
    product.updateDescription(Description.create({description:'Test 2'}).getValue())
    expect(product.description.value).toBe('Test 2');
  });

  it("should update price product", () => {
    const ProductOrError = Product.create(validProductProps);
    const product = ProductOrError.getValue();
    product.updatePrice(Price.create({price:2}).getValue());
    expect(product.price.value).toBe(2);
  });
  
  it("should update quantity product", () => {
    const ProductOrError = Product.create(validProductProps);
    const product = ProductOrError.getValue();
    product.updateQuantity(Quantity.create({quantity:2}).getValue());
    expect(product.quantity.value).toBe(2);
  });

  it("should return error when userId is null", () => {

    const invalidProductProps = {
        id: validProductProps.id,
        description: validProductProps.description,
        price: validProductProps.price,
        quantity: validProductProps.quantity,
    }
    //@ts-ignore
    const ProductOrError = Product.create(invalidProductProps);
    expect(ProductOrError.isSuccess).toBe(false);
  });
  it("should return error when description is null", () => {

    const invalidProductProps = {
        id: validProductProps.id,
        userId: validProductProps.userId,
        price: validProductProps.price,
        quantity: validProductProps.quantity,
    }
    //@ts-ignore
    const ProductOrError = Product.create(invalidProductProps);
    expect(ProductOrError.isSuccess).toBe(false);
  });
  it("should return error when price is null", () => {

    const invalidProductProps = {
        id: validProductProps.id,
        userId: validProductProps.userId,
        description: validProductProps.description,
        quantity: validProductProps.quantity,
    }
    //@ts-ignore
    const ProductOrError = Product.create(invalidProductProps);
    expect(ProductOrError.isSuccess).toBe(false);
  });
  it("should return error when quantity is null", () => {

    const invalidProductProps = {
        id: validProductProps.id,
        userId: validProductProps.userId,
        description: validProductProps.description,
        price: validProductProps.price,
    }
    //@ts-ignore
    const ProductOrError = Product.create(invalidProductProps);
    expect(ProductOrError.isSuccess).toBe(false);
  });
});

describe("Description", () => {
  it("should give error: Text is not at least 2 chars", () => {
    const DescriptionOrError = Description.create({ description: "t" });
    expect(DescriptionOrError.getErrorValue()).toBe(
      "description: Text is not at least 2 chars."
    );
  });
  it("should return Description", () => {
    const DescriptionOrError = Description.create({ description: "test" });
    expect(DescriptionOrError.getValue().props.description).toBe("test");
  });
  it("should give error: Text is greater than 30 chars", () => {
    const DescriptionOrError = Description.create({ description: "qwertyuiopoiuytrewqwertyuiopoiq" });
    expect(DescriptionOrError.getErrorValue()).toBe(
      "description: Text is greater than 30 chars."
    );
  });
});

describe("Price", () => {
  
  it("should return Price", () => {
    const PriceOrError = Price.create({ price: 2 });
    expect(PriceOrError.getValue().value).toBe(2);
  });

  it("should return error when price is null", () => {
    //@ts-ignore
    const PriceOrError = Price.create({ price: null });
    expect(`${PriceOrError.getErrorValue()}`).toBe('price is null or undefined');
  });

});

describe("Quantity", () => {
  
  it("should return Quantity", () => {
    const QuantityOrError = Quantity.create({ quantity: 2 });
    expect(QuantityOrError.getValue().value).toBe(2);
  });

  it("should return error when quantity is null", () => {
    //@ts-ignore
    const QuantityOrError = Quantity.create({ quantity: null });
    expect(`${QuantityOrError.getErrorValue()}`).toBe('quantity is null or undefined');
  });

});

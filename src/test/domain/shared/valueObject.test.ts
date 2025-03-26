import { ValueObject } from "../../../domain/shared/ValueObject";

interface MockProps {
  name: string;
  email: string;
}

class MockValueObject extends ValueObject<MockProps> {}

describe('ValueObject', () => {
  it('Should create a ValueObject with given properties', () => {
    const vo = new MockValueObject({ name: 'Test', email: 'test@test.com' });

    expect(vo.props).toEqual({ name: 'Test', email: 'test@test.com' });
  });

  it('Should compare two ValueObjects with the same properties as equal', () => {
    const vo1 = new MockValueObject({ name: 'Test', email: 'test@test.com' });
    const vo2 = new MockValueObject({ name: 'Test', email: 'test@test.com' });

    expect(vo1.equals(vo2)).toBe(true);
  });

  it('Should compare two ValueObjects with different properties as not equal', () => {
    const vo1 = new MockValueObject({ name: 'Test', email: 'test@test.com' });
    const vo2 = new MockValueObject({ name: 'Test2', email: 'test2@test.com' });

    expect(vo1.equals(vo2)).toBe(false);
  });

  it('Should return false when comparing with null or undefined', () => {
    const vo = new MockValueObject({ name: 'Test', email: 'test@test.com' });
    //@ts-ignore
    expect(vo.equals(null)).toBe(false);
    expect(vo.equals(undefined)).toBe(false);
  });

  it('Should return false when comparing with an object without props', () => {
    const vo = new MockValueObject({ name: 'Test', email: 'test@test.com' });
    const otherObj = { notAValueObject: true };

    // @ts-expect-error: Testing invalid comparison
    expect(vo.equals(otherObj)).toBe(false);
  });
});

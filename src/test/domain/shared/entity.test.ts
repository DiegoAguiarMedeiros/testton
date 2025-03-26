import { Entity } from "../../../domain/shared/Entity";
import { UniqueEntityID } from "../../../domain/shared/UniqueEntityID";

export class MockUniqueEntityID extends UniqueEntityID {
  constructor(private mockId: string) {
    super();
  }

  toString(): string {
    return this.mockId;
  }

  equals(id: UniqueEntityID): boolean {
    return id.toString() === this.mockId;
  }
}

interface MockProps {
  name: string;
  email: string;
}

class MockEntity extends Entity<MockProps> {}

describe('Entity', () => {
  it('should create a entity with unique id', () => {
    const entity = new MockEntity({ name: 'Test', email: 'test@test.com' });

    expect(entity).toBeInstanceOf(MockEntity);
    expect(entity.props).toEqual({ name: 'Test', email: 'test@test.com' });
    expect(entity.value).toBeDefined();
  });

  it('should accept a custom ID', () => {
    const id = new MockUniqueEntityID('1234');
    const entity = new MockEntity({ name: 'Test', email: 'test@test.com' }, id);

    expect(entity.value).toBe('1234');
  });

  it('should compare two entities with the same ID as equal', () => {
    const id = new MockUniqueEntityID('1234');
    const entity1 = new MockEntity({ name: 'Test', email: 'test@test.com' }, id);
    const entity2 = new MockEntity({ name: 'Outro', email: '25' }, id);

    expect(entity1.equals(entity2)).toBe(true);
  });

  it('should compare two entities with different IDs as different', () => {
    const entity1 = new MockEntity({ name: 'Test', email: 'test@test.com' }, new MockUniqueEntityID('1234'));
    const entity2 = new MockEntity({ name: 'Other', email: 'test@test2.com' }, new MockUniqueEntityID('5678'));

    expect(entity1.equals(entity2)).toBe(false);
  });

  it('should compare the same entity', () => {
    const entity1 = new MockEntity({ name: 'Test', email: 'test@test.com' }, new MockUniqueEntityID('1234'));

    expect(entity1.equals(entity1)).toBe(true);
  });
  it('should compare an entity with a object that is not a entity', () => {
    const entity1 = new MockEntity({ name: 'Test', email: 'test@test.com' }, new MockUniqueEntityID('1234'));

    //@ts-ignore
    expect(entity1.equals({test:'note entity'})).toBe(false);
  });

  it('should return false when comparing to a null or undefined object', () => {
    const entity = new MockEntity({ name: 'Test', email: 'test@test.com' });
    //@ts-ignore
    expect(entity.equals(null)).toBe(false);
    expect(entity.equals(undefined)).toBe(false);
  });
});

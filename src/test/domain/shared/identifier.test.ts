import { Identifier } from "../../../domain/shared/Identifier";

class OtherIdentifier {
    constructor(private value: string) {}
  }
  
  describe('Identifier', () => {
    it('Should create an identifier with a given value', () => {
      const id = new Identifier('1234');
  
      expect(id.toValue()).toBe('1234');
    });
  
    it('Should compare two identifiers with the same value as equal', () => {
      const id1 = new Identifier('1234');
      const id2 = new Identifier('1234');
  
      expect(id1.equals(id2)).toBe(true);
    });
  
    it('Should compare two identifiers with different values as not equal', () => {
      const id1 = new Identifier('1234');
      const id2 = new Identifier('5678');
  
      expect(id1.equals(id2)).toBe(false);
    });
  
    it('Should return false when comparing with null or undefined', () => {
      const id = new Identifier('1234');
        //@ts-ignore
      expect(id.equals(null)).toBe(false);
      expect(id.equals(undefined)).toBe(false);
    });
  
    it('Should return false when comparing with an object of a different class', () => {
      const id = new Identifier('1234');
      const otherId = new OtherIdentifier('1234'); // Different class
  
      // @ts-expect-error: Testing invalid comparison
      expect(id.equals(otherId)).toBe(false);
    });
  
    it('Should return the string representation of the value', () => {
      const id = new Identifier(1234);
  
      expect(id.toString()).toBe('1234');
    });
  
    it('Should return the raw value using toValue()', () => {
      const id = new Identifier(1234);
  
      expect(id.toValue()).toBe(1234);
    });
  });

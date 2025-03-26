import { Guard } from '../../../../domain/shared/core/Guard';
import { Result } from '../../../../domain/shared/core/Result';

describe('Guard', () => {
  
  it('should combine multiple Result objects and return ok', () => {
    const successResult = Result.ok();
    const successResult2 = Result.ok();
    
    const result = Guard.combine([successResult, successResult2]);
    expect(result.isSuccess).toBe(true);
  });

  it('should combine multiple Result objects and return failure if any result is a failure', () => {
    const successResult = Result.ok();
    const failureResult = Result.fail('Failure');
    
    const result = Guard.combine([successResult, failureResult]);
    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('Failure');
  });

  it('should validate if a number is greater than a minimum value', () => {
    const result = Guard.greaterThan(10, 15);
    expect(result.isSuccess).toBe(true);

    const resultFail = Guard.greaterThan(20, 15);
    expect(resultFail.isFailure).toBe(true);
    expect(resultFail.getErrorValue()).toBe('Number given {15} is not greater than {20}');
  });

  it('should validate if a string meets the minimum character length', () => {
    const result = Guard.againstAtLeast(5, 'Hello');
    expect(result.isSuccess).toBe(true);

    const resultFail = Guard.againstAtLeast(10, 'Hello');
    expect(resultFail.isFailure).toBe(true);
    expect(resultFail.getErrorValue()).toBe('Text is not at least 10 chars.');
  });

  it('should validate if a string meets the maximum character length', () => {
    const result = Guard.againstAtMost(10, 'Hello');
    expect(result.isSuccess).toBe(true);

    const resultFail = Guard.againstAtMost(4, 'Hello');
    expect(resultFail.isFailure).toBe(true);
    expect(resultFail.getErrorValue()).toBe('Text is greater than 4 chars.');
  });

  it('should validate if an argument is not null or undefined', () => {
    const result = Guard.againstNullOrUndefined('value', 'Test');
    expect(result.isSuccess).toBe(true);

    const resultFail = Guard.againstNullOrUndefined(null, 'Test');
    expect(resultFail.isFailure).toBe(true);
    expect(resultFail.getErrorValue()).toBe('Test is null or undefined');
  });

  it('should validate multiple arguments for null or undefined', () => {
    const result = Guard.againstNullOrUndefinedBulk([
      { argument: 'value', argumentName: 'Test1' },
      { argument: 'value2', argumentName: 'Test2' }
    ]);
    expect(result.isSuccess).toBe(true);

    const resultFail = Guard.againstNullOrUndefinedBulk([
      { argument: null, argumentName: 'Test1' },
      { argument: 'value2', argumentName: 'Test2' }
    ]);
    expect(resultFail.isFailure).toBe(true);
    expect(resultFail.getErrorValue()).toBe('Test1 is null or undefined');
  });

  it('should validate if a value is one of the valid values', () => {
    const result = Guard.isOneOf('apple', ['apple', 'banana', 'orange'], 'Fruit');
    expect(result.isSuccess).toBe(true);

    const resultFail = Guard.isOneOf('grape', ['apple', 'banana', 'orange'], 'Fruit');
    expect(resultFail.isFailure).toBe(true);
    expect(resultFail.getErrorValue()).toBe('Fruit isn\'t oneOf the correct types in ["apple","banana","orange"]. Got "grape".');
  });

  it('should validate if a number is within a range', () => {
    const result = Guard.inRange(5, 1, 10, 'Number');
    expect(result.isSuccess).toBe(true);

    const resultFail = Guard.inRange(15, 1, 10, 'Number');
    expect(resultFail.isFailure).toBe(true);
    expect(resultFail.getErrorValue()).toBe('Number is not within range 1 to 10.');
  });

  it('should validate if all numbers in an array are within a range', () => {
    const result = Guard.allInRange([5, 8, 10], 1, 10, 'Numbers');
    expect(result.isSuccess).toBe(true);

    const resultFail = Guard.allInRange([5, 15, 10], 1, 10, 'Numbers');
    expect(resultFail.isFailure).toBe(true);
    expect(resultFail.getErrorValue()).toBe('Numbers is not within the range.');
  });
});

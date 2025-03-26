import { Result,  left, right } from '../../../../domain/shared/core/Result';

describe('Result', () => {

  it('Should create a successful result with a value', () => {
    const result = Result.ok('Success value');
    expect(result.isSuccess).toBe(true);
    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toBe('Success value');
  });

  it('Should create a failure result with an error message', () => {
    const result = Result.fail('Error message');
    expect(result.isSuccess).toBe(false);
    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('Error message');
  });

  it('Should throw an error if a success result is created with an error', () => {
    expect(() => new Result(true, 'Error message')).toThrow(
      'InvalidOperation: A result cannot be successful and contain an error'
    );
  });

  it('Should throw an error if a failure result is created without an error', () => {
    expect(() => new Result(false)).toThrow(
      'InvalidOperation: A failing result needs to contain an error message'
    );
  });

  it('Should retrieve the value from a successful result', () => {
    const result = Result.ok('Test Value');
    expect(result.getValue()).toBe('Test Value');
  });

  it("Should throw an error when trying to retrieve a value from a failure result", () => {
    const result = Result.fail('Failure');
    expect(() => result.getValue()).toThrow(
      "Can't get the value of an error result. Use 'errorValue' instead."
    );
  });

  it('Should retrieve the error message from a failure result', () => {
    const result = Result.fail('Failure Message');
    expect(result.getErrorValue()).toBe('Failure Message');
  });

  it('Should combine multiple successful results into a single success result', () => {
    const result = Result.combine([Result.ok(), Result.ok(), Result.ok()]);
    expect(result.isSuccess).toBe(true);
  });

  it('Should return the first failure result when combining multiple results with a failure', () => {
    const result = Result.combine([
      Result.ok(),
      Result.fail('First failure'),
      Result.ok(),
      Result.fail('Second failure')
    ]);
    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('First failure');
  });

});

describe('Either', () => {

  it('Should create a Left instance and verify it is a left value', () => {
    const result = left<string, number>('Error occurred');
    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBe('Error occurred');
  });

  it('Should create a Right instance and verify it is a right value', () => {
    const result = right<string, number>(42);
    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBe(42);
  });

  it('Should return correct values from left and right instances', () => {
    const leftValue = left<string, number>('Left value');
    const rightValue = right<string, number>(100);

    expect(leftValue.value).toBe('Left value');
    expect(rightValue.value).toBe(100);
  });

});

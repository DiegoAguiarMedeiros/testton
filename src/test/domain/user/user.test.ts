import { describe, expect, test, it } from "@jest/globals";
import { Name } from '../../../domain/entities/user/Name';
import { Password } from '../../../domain/entities/user/Password';
import { Email } from '../../../domain/entities/user/Email';
import { User } from '../../../domain/entities/user/User';
import { Id } from '../../../domain/shared/Id';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { UserMap } from '../../../shared/mappers/UserMap';
import { UserDTO } from '../../../domain/dto/UserDTO';
import { JWTToken, RefreshToken } from "../../../domain/entities/user/Jwt";
import { authService } from "../../../infrastructure/services";

describe("User", () => {
  const validUserProps = {
    id: Id.create(new UniqueEntityID()).getValue(),
    email: Email.create("test@test.com").getValue(),
    name: Name.create({ name: "Test" }).getValue(),
    password: Password.create({
      value: "r1234567",
      hashed: true,
    }).getValue(),
  };

  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlkIjoiOGVlY2E5ZjUtMTc2Yi00YmRiLWFkMDctZDZmZDc2YmZjM2VmIiwibmFtZSI6IlRlc3RlIiwiaWF0IjoxNzQyOTQ2NzgxLCJleHAiOjE3NDMwMzMxODF9.djtnfpBsDTgrFi_PhKZwoDTmheCkyvSbJuIBBNrLGj4'
  const refreshToken = 'lNwcLGBBWkoAGaUd6wLC10oiR5ocwsZ5N2p1loudMvWoJH0AO0BzwpreO8VSPEiFOcFG5gfmYhoZdKeNHdY2J5bGXXkHv61G2eypDduZorpD1i0dTxlurFRlDS6PDdoup5MTWp22O4LN4KLrHaZzOWVKjAegepL9wxAcI3DNnZShXhExfsojMSuz6r9wpadmE1uOLJd2QS9RfQhNo3muSUZMpU5G5SCVJNh5A1V7qlkZvfU0B49XS357Jvbj8Own'

  it("should create user", () => {
    const userOrError = User.create(validUserProps);
    expect(userOrError.isSuccess).toBe(true);
  });

  it("should get blank accessToken, refreshToken and lastLogin", () => {
    const userOrError = User.create(validUserProps);
    const lastLogin = new Date('1900-01-01T00:00:00Z');
    expect(userOrError.isSuccess).toBe(true);
    const user = userOrError.getValue();
    expect(user.accessToken).toBe('');
    expect(user.refreshToken).toBe('');
    expect(user.lastLogin.getUTCDate()).toBe(lastLogin.getUTCDate());
  });
  it("should false from user.isLoggedIn", () => {
    const userOrError = User.create(validUserProps);
    const lastLogin = new Date('1900-01-01T00:00:00Z');
    expect(userOrError.isSuccess).toBe(true);
    const user = userOrError.getValue();
    expect(user.isLoggedIn()).toBe(false);
  });

  it("should set accessToken, refreshToken and lastLogin", () => {
    const userOrError = User.create(validUserProps);
    const lastLogin = new Date();
    expect(userOrError.isSuccess).toBe(true);

    const user = userOrError.getValue();
    user.setAccessToken(accessToken, refreshToken);
    expect(user.accessToken).toBe(accessToken);
    expect(user.refreshToken).toBe(refreshToken);
    expect(user.lastLogin.getUTCDate()).toBe(lastLogin.getUTCDate());
  });

  it("should return error when id is null", () => {

    const invalidUserProps = {
      name: validUserProps.name,
      email: validUserProps.email,
      password: validUserProps.password,
    }
    //@ts-ignore
    const userOrError = User.create(invalidUserProps);
    expect(userOrError.isSuccess).toBe(false);
    expect(userOrError.getErrorValue()).toBe("User :id is null or undefined");
  });
  it("should return error when name is null", () => {

    const invalidUserProps = {
      id: validUserProps.id,
      email: validUserProps.email,
      password: validUserProps.password,
    }
    //@ts-ignore
    const userOrError = User.create(invalidUserProps);
    expect(userOrError.isSuccess).toBe(false);
    expect(userOrError.getErrorValue()).toBe("User :name is null or undefined");
  });
  it("should return error when email is null", () => {

    const invalidUserProps = {
      id: validUserProps.id,
      name: validUserProps.name,
      password: validUserProps.password,
    }
    //@ts-ignore
    const userOrError = User.create(invalidUserProps);
    expect(userOrError.isSuccess).toBe(false);
    expect(userOrError.getErrorValue()).toBe("User :email is null or undefined");
  });
  it("should return error when password is null", () => {

    const invalidUserProps = {
      id: validUserProps.id,
      name: validUserProps.name,
      email: validUserProps.email,
    }
    //@ts-ignore
    const userOrError = User.create(invalidUserProps);
    expect(userOrError.isSuccess).toBe(false);
    expect(userOrError.getErrorValue()).toBe("User :password is null or undefined");
  });
});

describe("Email", () => {
  it("should give error: Email address not valid", () => {
    const EmailOrError = Email.create("test@testcom");
    expect(EmailOrError.getErrorValue()).toBe("email address not valid");
  });
  it("should return Email", () => {
    const NameOrError = Email.create("test@test.com");
    expect(NameOrError.getValue().props.value).toBe("test@test.com");
  });
});
describe("Name", () => {
  it("should give error: Text is not at least 2 chars", () => {
    const NameOrError = Name.create({ name: "t" });
    expect(NameOrError.getErrorValue()).toBe(
      "name: Text is not at least 2 chars."
    );
  });
  it("should return Name", () => {
    const NameOrError = Name.create({ name: "test" });
    expect(NameOrError.getValue().props.name).toBe("test");
  });
  it("should give error: Text is greater than 30 chars", () => {
    const NameOrError = Name.create({ name: "qwertyuiopoiuytrewqwertyuiopoiq" });
    expect(NameOrError.getErrorValue()).toBe(
      "name: Text is greater than 30 chars."
    );
  });
});
describe("Password", () => {

  it("should give error: Password doesnt meet criteria [8 chars min]", () => {
    const PasswordOrError = Password.create({ value: "a" });
    expect(PasswordOrError.getErrorValue()).toBe(
      "Password doesnt meet criteria [8 chars min]."
    );
  });

  it("should return Password", () => {
    const PasswordOrError = Password.create({ value: "12345678" });
    expect(PasswordOrError.getValue().props.value).toBe("12345678");
  });

  it("should return true from comparePassword password not hased", async () => {
    const PasswordOrError = Password.create({ value: "12345678" });
    expect(PasswordOrError.isSuccess).toBe(true);
    const password = PasswordOrError.getValue();
    expect(await password.comparePassword('12345678')).toBe(true);
  });

  it("should return false from comparePassword password not hased but hashed set true", async () => {
    const PasswordOrError = Password.create({
      value: "12345678",
      hashed: true,
    });
    expect(PasswordOrError.isSuccess).toBe(true);
    const password = PasswordOrError.getValue();
    expect(await password.comparePassword('12345678')).toBe(false);
  });

  it("should return false from comparePassword password not hased", async () => {
    const PasswordOrError = Password.create({ value: "12345678" });
    expect(PasswordOrError.isSuccess).toBe(true);
    const password = PasswordOrError.getValue();
    expect(await password.comparePassword('1234567')).toBe(false);
  });

  it("should return true from comparePassword password hased but hashed set false", async () => {
    const PasswordOrError = Password.create({
      value: "$2a$10$EG6GoDWFEz6wF95O0gC2BuwhaHAZggT12HPR0jiuyN/gjKcpmQS4i",
      hashed: false,
    });
    expect(PasswordOrError.isSuccess).toBe(true);
    const password = PasswordOrError.getValue();
    expect(await password.comparePassword('12345678')).toBe(false);
  });

  it("should return hashed value password not hased", async () => {
    const PasswordOrError = Password.create({
      value: "12345678",
      hashed: false,
    });
    expect(PasswordOrError.isSuccess).toBe(true);
    const password = PasswordOrError.getValue();
    expect(await password.getHashedValue()).toMatch(
      /^\$2[ayb]\$.{56}$/
    );

  });
  it("should return hashed value password  hased", async () => {
    const PasswordOrError = Password.create({
      value: "$2a$10$EG6GoDWFEz6wF95O0gC2BuwhaHAZggT12HPR0jiuyN/gjKcpmQS4i",
      hashed: true,
    });
    expect(PasswordOrError.isSuccess).toBe(true);
    const password = PasswordOrError.getValue();
    expect(await password.getHashedValue()).toMatch(
      /^\$2[ayb]\$.{56}$/
    );
  });
  
  it("should return true from comparePassword password hased", async () => {
    const PasswordOrError = Password.create({
      value: "$2a$10$EG6GoDWFEz6wF95O0gC2BuwhaHAZggT12HPR0jiuyN/gjKcpmQS4i",
      hashed: true,
    });
    expect(PasswordOrError.isSuccess).toBe(true);
    const password = PasswordOrError.getValue();
    expect(await password.comparePassword('12345678')).toBe(true);
  });

  it("should return false from comparePassword password hased", async () => {
    const PasswordOrError = Password.create({
      value: "$2a$10$EG6GoDWFEz6wF95O0gC2BuwhaHAZggT12HPR0jiuyN/gjKcpmQS4i",
      hashed: true,
    });
    expect(PasswordOrError.isSuccess).toBe(true);
    const password = PasswordOrError.getValue();
    expect(await password.comparePassword('1234567')).toBe(false);
  });

  it("should return true on comparePassword", async () => {
    const PasswordOrError = Password.create({ value: "12345678" });
    expect(
      await PasswordOrError.getValue().comparePassword("12345678")
    ).toBe(true);
  });

  it("should return false on comparePassword", async () => {
    const PasswordOrError = Password.create({ value: "12345678" });
    expect(
      await PasswordOrError.getValue().comparePassword("1234567")
    ).toBe(false);
  });

  it("should return false on isAlreadyHashed", async () => {
    const PasswordOrError = Password.create({ value: "12345678" });
    expect(await PasswordOrError.getValue().isAlreadyHashed()).toBe(false);
  });

  it("should return true on isAlreadyHashed", async () => {
    const PasswordOrError = Password.create({
      value: "$2a$10$EG6GoDWFEz6wF95O0gC2BuwhaHAZggT12HPR0jiuyN/gjKcpmQS4i",
      hashed: true,
    });
    expect(await PasswordOrError.getValue().isAlreadyHashed()).toBe(true);
  });

  it("should return hash of password", async () => {
    const PasswordOrError = Password.create({ value: "12345678" });
    expect(await PasswordOrError.getValue().getHashedValue()).toMatch(
      /^\$2[ayb]\$.{56}$/
    );
  });
});

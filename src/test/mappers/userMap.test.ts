import { describe, expect, test } from "@jest/globals";
import bcrypt from 'bcryptjs';
import { Name } from '../../domain/entities/user/Name';
import { Password } from '../../domain/entities/user/Password';
import { Email } from '../../domain/entities/user/Email';
import { User } from '../../domain/entities/user/User';
import { Id } from '../../domain/shared/Id';
import { UniqueEntityID } from '../../domain/shared/UniqueEntityID';
import { UserMap } from '../../shared/mappers/UserMap';
import { UserDTO } from '../../domain/dto/UserDTO';


describe("UserMap", () => {
  describe("toDTO", () => {
    it("should User maper to UserDTO", () => {

      const IdOrError = Id.create(new UniqueEntityID('7b0ec344-5da1-4501-8747-2db62f221492'));
      const NameOrError = Name.create({ name: "test" });
      const PasswordOrError = Password.create({
        value: "r1234567",
        hashed: true,
      });
      const EmailOrError = Email.create("test@test.com");

      const userOrError = User.create({
        id: IdOrError.getValue(),
        name: NameOrError.getValue(),
        password: PasswordOrError.getValue(),
        email: EmailOrError.getValue(),
      });

      const userDTO: UserDTO = UserMap.toDTO(userOrError.getValue());

      expect(userDTO).toStrictEqual({
        id: "7b0ec344-5da1-4501-8747-2db62f221492",
        name: "test",
        email: "test@test.com",
      });
    });
  });
  describe("toDomain", () => {

    it("should UserDTO maper to Domain", () => {
      const userDTO: any = {
        id: "7b0ec344-5da1-4501-8747-2db62f221492",
        name: "test",
        email: "test@test.com",
        password:
          "$2a$10$7hiC64opADPYTTwkX9oW5emuVWP9VtpxKXl35e0bwn6DEUKSgm/lG",
      };

      const user: User = UserMap.toDomain(userDTO);

      expect(user.id.value).toMatch(/^[a-f0-9-]{36}$/);
      expect(user.email.value).toBe("test@test.com");
      expect(user.name.value).toBe("test");
      expect(user.password.value).toBe(
        "$2a$10$7hiC64opADPYTTwkX9oW5emuVWP9VtpxKXl35e0bwn6DEUKSgm/lG"
      );
    });

    it("should return error for id is null", () => {
      const rawProduct = {
        name: "test",
        password:
          "$2a$10$7hiC64opADPYTTwkX9oW5emuVWP9VtpxKXl35e0bwn6DEUKSgm/lG",
        email: "test@test.com",
      };
      expect(() => {
        UserMap.toDomain(rawProduct);
      }).toThrow('id is null or undefined');
    });

    it("should return error for Name is null", () => {
      const rawUser = {
        id: "7b0ec344-5da1-4501-8747-2db62f221492",
        password:
          "$2a$10$7hiC64opADPYTTwkX9oW5emuVWP9VtpxKXl35e0bwn6DEUKSgm/lG",
        email: "test",
      };
      expect(() => {
        UserMap.toDomain(rawUser);
      }).toThrow('name is null or undefined');
    });

    it("should return error for password is null", () => {
      const rawUser = {
        id: "7b0ec344-5da1-4501-8747-2db62f221492",
        name: "test",
        email: "test@test.com",
      };
      expect(() => {
        UserMap.toDomain(rawUser);
      }).toThrow('password is null or undefined');
    });

    it("should return error for email is null", () => {
      const rawUser = {
        id: "7b0ec344-5da1-4501-8747-2db62f221492",
        name: "test",
        password:
          "$2a$10$7hiC64opADPYTTwkX9oW5emuVWP9VtpxKXl35e0bwn6DEUKSgm/lG",
      };

      expect(() => {
        UserMap.toDomain(rawUser);
      }).toThrow('email cannot be null');
    });
    it("should return error for email is not valid", () => {
      const rawUser = {
        id: "7b0ec344-5da1-4501-8747-2db62f221492",
        name: "test",
        password:
          "$2a$10$7hiC64opADPYTTwkX9oW5emuVWP9VtpxKXl35e0bwn6DEUKSgm/lG",
        email: "test",
      };

      expect(() => {
        UserMap.toDomain(rawUser);
      }).toThrow('email address not valid');
    });
  });

  describe("toPersistence", () => {

    it("should correctly map a User object to persistence format with password hashed false", async () => {
      const IdOrError = Id.create(new UniqueEntityID());
      const NameOrError = Name.create({ name: "test" });
      const PasswordOrError = Password.create({
        value: "12345678",
        hashed: false,
      });
      const EmailOrError = Email.create("test@test.com");

      const userOrError = User.create({
        id: IdOrError.getValue(),
        name: NameOrError.getValue(),
        password: PasswordOrError.getValue(),
        email: EmailOrError.getValue(),
      });
      const persistenceData = await UserMap.toPersistence(
        userOrError.getValue()
      );

      const isPasswordValid = await bcrypt.compare('12345678', persistenceData.password);
      expect(isPasswordValid).toBe(true);

    });

    it("should correctly map a User object to persistence format with password hashed true", async () => {
      const IdOrError = Id.create(new UniqueEntityID());
      const NameOrError = Name.create({ name: "test" });
      const PasswordOrError = Password.create({
        value: "$2a$10$7hiC64opADPYTTwkX9oW5emuVWP9VtpxKXl35e0bwn6DEUKSgm/lG",
        hashed: true,
      });
      const EmailOrError = Email.create("test@test.com");

      const userOrError = User.create({
        id: IdOrError.getValue(),
        name: NameOrError.getValue(),
        password: PasswordOrError.getValue(),
        email: EmailOrError.getValue(),
      });
      const persistenceData = await UserMap.toPersistence(
        userOrError.getValue()
      );

      expect(persistenceData).toStrictEqual({
        id: userOrError.getValue().id.value,
        email: userOrError.getValue().email.value,
        name: userOrError.getValue().name.value,
        password: userOrError.getValue().password.value,
      });
    });
  });
});

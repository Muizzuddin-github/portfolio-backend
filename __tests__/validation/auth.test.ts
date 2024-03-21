import Joi from "joi";
import { Login, Register } from "../../src/requestbody/users";
import AuthValidation from "../../src/validation/auth";
describe("Register", () => {
  it("should success", async () => {
    const data: Register = {
      username: "testing1",
      email: "testing@gmail.com",
      password: "123",
    };

    const val: Register = await AuthValidation.register(data);

    expect(val).toEqual(data);
  });

  it("should validation required", async () => {
    try {
      const data: Register = {
        username: " ",
        email: " ",
        password: " ",
      };

      await AuthValidation.register(data);
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        expect(err instanceof Joi.ValidationError).toBe(true);

        expect(err.message.split(".").length).toBe(3);
      }
    }
  });
});

describe("Login", () => {
  it("should success", async () => {
    const data: Login = {
      email: "testing@gmail.com",
      password: "123",
    };

    const val: Login = await AuthValidation.login(data);

    expect(val).toEqual(data);
  });

  it("should validation error required", async () => {
    try {
      const data: Login = {
        email: " ",
        password: " ",
      };

      await AuthValidation.login(data);
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        expect(err.message.split(".").length).toBe(2);
      }
    }
  });
});

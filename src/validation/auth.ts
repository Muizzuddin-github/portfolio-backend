import Joi from "joi";
import { Login, Register } from "../requestbody/users";

class AuthValidationSchema {
  protected static get registerSchema(): Joi.ObjectSchema {
    return Joi.object({
      username: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    });
  }

  protected static get loginSchema(): Joi.ObjectSchema {
    return Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    });
  }
}

class AuthValidation extends AuthValidationSchema {
  public static register(body: Register): Promise<Register> {
    return super.registerSchema.validateAsync(body, {
      abortEarly: false,
    });
  }

  public static login(body: Login): Promise<Login> {
    return super.loginSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default AuthValidation;

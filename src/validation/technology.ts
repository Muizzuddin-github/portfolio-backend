import Joi from "joi";
import { TechnologyReqBody } from "../requestbody/technology";

class TechnologyValidationSchema {
  protected static get addSchema() {
    return Joi.object({
      name: Joi.string().trim().required(),
    });
  }
}

class TechnologyValidation extends TechnologyValidationSchema {
  static add(body: TechnologyReqBody): Promise<TechnologyReqBody> {
    return super.addSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default TechnologyValidation;

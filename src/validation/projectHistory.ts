import Joi from "joi";
import { ProjectHistoryReqBody } from "../requestbody/ProjectHistory";

class ProjectHistorySchema {
  protected static get addSchema() {
    return Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      technology: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().trim().required(),
            logo: Joi.string().trim().required(),
          })
        )
        .min(1),
    });
  }
}

class ProjectHistoryValidation extends ProjectHistorySchema {
  static add(body: ProjectHistoryReqBody) {
    return super.addSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default ProjectHistoryValidation;

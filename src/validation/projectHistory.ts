import Joi from "joi";
import { ProjectHistoryReqBody } from "../requestbody/ProjectHistory";

class ProjectHistorySchema {
  protected static get dataSchema() {
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
  static data(body: ProjectHistoryReqBody) {
    return super.dataSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default ProjectHistoryValidation;

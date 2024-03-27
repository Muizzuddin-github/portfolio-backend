import Joi from "joi";
import { ProjectHistoryReqBody } from "../../src/requestbody/ProjectHistory";

import ProjectHistoryValidation from "../../src/validation/projectHistory";

describe("Project history validation", () => {
  it("should success", async () => {
    const data: ProjectHistoryReqBody = {
      title: "okeh gas",
      description: "aa",
      technology: [
        {
          name: "as",
          logo: "dsds",
        },
      ],
    };

    const val = await ProjectHistoryValidation.data(data);
    expect(val).toEqual(data);
  });

  it("should error required", async () => {
    try {
      const data: ProjectHistoryReqBody = {
        title: " ",
        description: " ",
        technology: [],
      };

      await ProjectHistoryValidation.data(data);
    } catch (err) {
      expect(err instanceof Joi.ValidationError).toBe(true);
    }
  });
});

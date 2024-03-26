import Joi from "joi";
import { TechnologyReqBody } from "../../src/requestbody/technology";
import TechnologyValidation from "../../src/validation/technology";

describe("Technology Validation", () => {
  it("should success", async () => {
    const data: TechnologyReqBody = {
      name: "hasan",
    };

    const val = await TechnologyValidation.add(data);

    expect(val).toEqual(data);
  });

  it("should error required", async () => {
    try {
      const data: TechnologyReqBody = {
        name: " ",
      };

      await TechnologyValidation.add(data);
    } catch (err) {
      expect(err instanceof Joi.ValidationError).toBe(true);
    }
  });
});

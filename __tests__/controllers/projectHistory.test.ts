import Technology from "../../src/controllers/technology";
import TechnologyCol from "../../src/models/technology";
import { NextFunction, Request, Response } from "express";

jest.mock("../../src/models/technology");

describe("GetAll", () => {
  it("should success", async () => {
    (TechnologyCol.find as jest.Mock).mockResolvedValue([]);

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const next: NextFunction = jest.fn();
    await Technology.getAll({} as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "All data technology",
      data: [],
    });
  });
});

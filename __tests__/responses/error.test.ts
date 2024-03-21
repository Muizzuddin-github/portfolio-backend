import ResponseErr from "../../src/responses/error";

describe("ResponseErr", () => {
  it("should success", () => {
    const r: ResponseErr = new ResponseErr(200, "OK");

    expect(r.getStatusCode).toBe(200);
    expect(r.message).toBe("OK");
  });
});

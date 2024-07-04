import request from "supertest";
import app from "../../src/app";

describe("GET /films", () => {
  it("should return all Star Wars Films when no episode number or title is provided", async () => {
    const response = await request(app).get("/films");
    expect(response.statusCode).toBe(200);
  });
});

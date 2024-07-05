import request from "supertest";
import app from "../../src/index";

describe("GET /planets", () => {
  it("should return all planets when no name is provided", async () => {
    const response = await request(app).get("/planets");
    expect(response.statusCode).toBe(200);
    // Aquí puedes añadir más expectativas, como verificar la estructura de los datos devueltos
  });
});

import request from "supertest";
import app from "../../src/index";

describe("GET /starships", () => {
  it("should return all people when no name is provided", async () => {
    const response = await request(app).get("/starships");
    expect(response.statusCode).toBe(200);
    // Aquí puedes añadir más expectativas, como verificar la estructura de los datos devueltos
  });

  //   it("should return people by name when name is provided", async () => {
  //     const name = "Skywalker";
  //     const response = await request(app).get(`/people?name=${name}`);
  //     expect(response.statusCode).toBe(200);
  //   });
});

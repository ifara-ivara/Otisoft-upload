import supertest from "supertest";
import app from "../lib/createServer";

describe("app", () => {
  describe("Health check", () => {
    it("Should be running without error", async () => {
      await supertest(app).get("/health-check").expect(200);
    });
  });
});

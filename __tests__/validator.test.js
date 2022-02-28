"use strict";
const server = require("../src/server.js");
const supertest = require("supertest");
const request = supertest(server.app);

describe("server", () => {
  it("should get status 404 for bad method ", async () => {
    const response = await request.post("/person");
    expect(response.status).toBe(404);
  });

  it("should  get status 500", async () => {
    const response = await request.get("/person?name=");
    expect(response.status).toBe(500);
  });

  it("should  get status 200", async () => {
    const response = await request.get("/person?name=marah");
    expect(response.status).toBe(200);
    expect(response.text).toBe('{"name":"marah"}');
  });
});

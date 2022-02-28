"use strict";
const server = require("../src/server");

const supertest = require("supertest");

const request = supertest(server.app);

let id;

describe("testing 404", () => {
  it("testing /person", async () => {
    const response = await request.get("/wrongPath");
    expect(response.status).toEqual(404);
  });

  it("testing bad method", async () => {
    id = 1;
    const response = await request.get("/clothes/1");
    expect(parseInt(response.body.id)).toEqual(id);
  });
});

describe("testing my server", () => {
  it("testing/", async () => {
    const response = await request.get("/");
    // console.log(response);
    expect(response.text).toEqual("home route");
  });

  it("testing/person", async () => {
    const response = await request.get("/person");
    expect(typeof response.body).toEqual("object");
  });
});

describe("testing food route", () => {
  it("testing get food", async () => {
    const response = await request.get("/food");
    expect(response.status).toEqual(200);
  });

  it("post new food", async () => {
    const response = await request.post("/food").send({
      foodName: "test",
      foodMainIngredient: "test",
    });
    expect(response.status).toEqual(202);
    id = response.body.id;
  });

  it("testing get food by id", async () => {
    const response = await request.get(`/food/${id}`);
    expect(response.status).toEqual(200);
  });

  it("testing delete food", async () => {
    const response = await request.delete(`/food/${id}`);
    expect(response.status).toEqual(200);
  });

  it("testing update food", async () => {
    const response = await request.get(`/food/${id}`).send({
      foodName: "test",
      foodMainIngredient: "test",
    });
    expect(response.status).toEqual(201);
  });
});

describe("testing clothes route", () => {
  it("testing get clothes", async () => {
    const response = await request.get("/clothes");
    expect(response.status).toEqual(200);
  });

  it("post new clothes", async () => {
    const response = await request.post("/clothes").send({
      clothesColor: "test",
      clothesSize: "test",
    });
    expect(response.status).toEqual(202);
    id = response.body.id;
  });

  it("testing delete clothes", async () => {
    const response = await request.delete(`/clothes/${id}`);
    expect(response.status).toEqual(200);
  });
  it("testing update clothes", async () => {
    const response = await request.get(`/clothes/${id}`).send({
      clothesColor: "test",
      clothesSize: "test",
    });
    expect(response.status).toEqual(201);
  });
});

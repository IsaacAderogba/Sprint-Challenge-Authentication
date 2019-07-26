const request = require("supertest");
const server = require("../../../api/server");
const db = require("../../../database/dbConfig");
const Controller = require("../controllers");

beforeEach(async () => {
  await db("users").truncate();
});

describe(" POST] /api/auth/register | Register user route handler", () => {
  it("returns the details of the registered user", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Isaac",
        password: "12345",
      })
      .expect(201)
      .then(res => {
        const { registeredUser } = res.body;

        expect(registeredUser.username).toEqual("Isaac");
        expect(res.body).toHaveProperty("token");
      });
  });

  it("increments the user database by 1 user", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Isaac",
        password: "12345",
      })
      .expect(201)
      .then(async () => {
        let users = await Controller.getUsers();
        expect(users).toHaveLength(1);
      });
  });
});

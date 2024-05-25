const request = require("supertest");
const app = require("./index");
const User = require('./models/Post');

describe("testing/users", () => {

    const user = {
      name: "Username",
      email: "test@example.com",
      birthDay: "123456",
      description:""
    };
    
    afterEach(async () => {
        await User.deleteMany({});
    });
    
    test("Create a user", async () => {
        let usersCount = await User.countDocuments({});
        expect(usersCount).toBe(0);
        resUser = await request(app).post("/create").send(user).expect(201);
        usersCount = await User.countDocuments({});
        expect(usersCount).toBe(1);
      });
})



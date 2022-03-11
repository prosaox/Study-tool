const request = require('supertest');
const db = require('../config/db')
const app = require('../app')

describe('loading express', function() {
    var token;
    const random = Math.floor(Math.random() * 100000);
    var res;
    beforeAll(async() => {
        db.connectDB();
        res = await request(app)
            .post("/api/users")
            .send({
                name: "aaron",
                email: random + "@gmail.com",
                password: "23411rf"
            })
        token = await request(app)
            .post("/api/auth")
            .send({
                email: random + "@gmail.com",
                password: "23411rf"
            })
        token = await request(app)
            .get("/api/auth")
            .send({
                email: random + "@gmail.com",
                password: "23411rf"
            })
    });
    afterAll(function() {
        // db.clear();
        db.closeDatabase();
    });
    it("empty test, should be error", async() => {
        token = await request(app)
            .post("/api/courses")
            .send({ name: "" })
        expect(token.statusCode).toEqual(400);
    });
    it("correct test, should be true", async() => {
        token = await request(app)
            .post("/api/courses")
            .send({ name: "4321" })
        expect(token.statusCode).toEqual(200);
    });
});
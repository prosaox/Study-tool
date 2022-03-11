const request = require('supertest');
const db = require('../config/db')
const app = require('../app')

describe('loading express', function() {
    var tokenret, course;
    const random = Math.floor(Math.random() * 100000);
    var res, check;
    beforeEach(async() => {
        db.connectDB();
        res = await request(app)
            .post("/api/users")
            .send({
                name: "aaron",
                email: random + "@gmail.com",
                password: "23411rf"
            })
        tokenret = await request(app)
            .post("/api/auth")
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
        check = await request(app)
            .get("/api/auth")
            .send({
                name: "aaron",
                email: random + "@gmail.com",
                password: "23411rf",
                token: tokenret
            })
        course = await request(app)
            .post("/api/courses")
            .send({ name: "", token: tokenret.body.token })
        expect(check).toEqual(400);
    });
    it("correct test, should be true", async() => {
        course = await request(app)
            .post("/api/courses")
            .send({ name: "4321", token: tokenret.body.token })
        expect(course.statusCode).toEqual(200);
    });
});
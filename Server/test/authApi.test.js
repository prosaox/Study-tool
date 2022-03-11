const request = require('supertest');
const db = require('../config/db')
const app = require('../app')
describe('loading express', function() {
    beforeEach(function() {
        rounter = require('../routes/authApi');

    });
    beforeAll(function() {
        db.connectDB();
    });
    afterAll(function() {
        db.closeDatabase();
    });
    it("add new token, should be true", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .post("/api/users")
            .send({
                name: "aaron",
                email: random + "@gmail.com",
                password: "23411rf"
            })
        const ress = await request(app)
            .post("/api/auth")
            .send({
                email: random + "@gmail.com",
                password: "23411rf"
            })
        expect(ress.statusCode).toEqual(200);
    });
    it("wrong password, should be wrong", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .post("/api/users")
            .send({
                name: "aaron",
                email: random + "@gmail.com",
                password: "23411rf"
            })
        const ress = await request(app)
            .post("/api/auth")
            .send({
                email: random + "@gmail.com",
                password: "23411r"
            })
        expect(ress.statusCode).toEqual(400);
    });
    it("mail not existed, should be wrong", async() => {
        const random = Math.floor(Math.random() * 100000);
        const ress = await request(app)
            .post("/api/auth")
            .send({
                email: random + "@mail.com",
                password: "23411r"
            })
        expect(ress.statusCode).toEqual(400);
    });
    it("empty test, should be error", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .get("/api/auth")
        expect(res.statusCode).toEqual(401);
    });

});
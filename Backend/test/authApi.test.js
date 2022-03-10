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
    it("empty test, should be error", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .post("/api/users")
            .send({
                name: "aaron",
                email: random + "gmail.com",
                password: "23411rf"
            })
        const ress = await request(app)
            .get("/api/auth")
            .send({
                name: "aaron",
                email: random + "gmail.com",
                password: "23411rf"
            })
        expect(ress.statusCode).toEqual(200);
    });
    it("empty test, should be error", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .get("/api/auth")
        expect(res.statusCode).toEqual(401);
    });

});
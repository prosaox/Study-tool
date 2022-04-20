const request = require('supertest');
const db = require('../config/db')
const app = require('../app')

describe('testing exam api', function() {
    beforeAll(async()=> {
        db.connectDB();        
            const res = await request(app)
            .post("/api/auth")
            .send({
                email: "pizza654@gmail.com",
                password:"gaira123"
            })

        // localStorage.setItem("token", res.token);
    });
    afterAll(function() {
        db.closeDatabase();
    });
    //test post
    it("add new exam, success", async() => {
        check = await request(app)
            .post("/api/exams")
            .send({
                courseId: "62510bf3b9ee04bdd8e072aa",
                title:"assingment 1",
                current:1,
                distribute:10,
                day:Date.now()
            })
        expect(check.statusCode).toEqual(200);
    });
    it("add new exam, fail for not having title", async() => {
        check = await request(app)
            .post("/api/exams")
            .send({
                courseId: "62510bf3b9ee04bdd8e072aa",
                title:"",
                current:1,
                distribute:10,
                day:Date.now()
            })
        expect(check.statusCode).toEqual(400);
    });
    it("add new exam, fail for not having distribute score", async() => {
        check = await request(app)
            .post("/api/exams")
            .send({
                courseId: "62510bf3b9ee04bdd8e072aa",
                title:"assingment 1",
                current:1,
                day:Date.now()
            })
        expect(check.statusCode).toEqual(400);
    });
    it("add new exam, fail for not having day", async() => {
        check = await request(app)
            .post("/api/exams")
            .send({
                courseId: "62510bf3b9ee04bdd8e072aa",
                title:"assingment 1",
                current:1,
                distribute:10
            })
        expect(check.statusCode).toEqual(400);
    });
    it("add new exam, fail for not existing courseid", async() => {
        check = await request(app)
            .post("/api/exams")
            .send({
                courseId: "ea",
                title:"assingment 1",
                current:1,
                distribute:10,
                day:Date.now()
            })
        expect(check.statusCode).toEqual(500);
    });
    // test get
    it("get all exam, success", async() => {
        check = await request(app)
            .get("/api/exams/62510bf3b9ee04bdd8e072aa")
        expect(check.statusCode).toEqual(200);
    });
});
const request = require('supertest');
const db = require('../config/db')
const app = require('../app')

describe('testing tasks', function() {

    beforeAll(function() {
        db.connectDB();
    });
    afterAll(function() {
        db.closeDatabase();
    });
    //test post
    it("add new task, success", async() => {
        check = await request(app)
            .post("/api/tasks")
            .send({
                userId:"6251037e6880701163b6d60f",
                courseId: "62510bf3b9ee04bdd8e072aa",
                name:"random task",
                description: "same meaning",
                start_date:Date.now(),
                due_date:Date.now()
            })
        expect(check.statusCode).toEqual(200);
    });
    it("add new task, fail for not having userId", async() => {
        check = await request(app)
            .post("/api/tasks")
            .send({
                courseId: "62510bf3b9ee04bdd8e072aa",
                name:"random task",
                description: "same meaning",
                start_date:Date.now(),
                due_date:Date.now()
            })
        expect(check.statusCode).not.toEqual(200);
    });
    it("add new task, fail for not having course id", async() => {
        check = await request(app)
            .post("/api/tasks")
            .send({
                userId:"6251037e6880701163b6d60f",
                name:"random task",
                description: "same meaning",
                start_date:Date.now(),
                due_date:Date.now()
            })
        expect(check.statusCode).not.toEqual(200);
    });
    it("add new task, fail for not having due_date", async() => {
        check = await request(app)
            .post("/api/tasks")
            .send({
                userId:"6251037e6880701163b6d60f",
                courseId: "62510bf3b9ee04bdd8e072aa",
                name:"random task",
                description: "same meaning"
            })
        expect(check.statusCode).not.toEqual(200);
    });
    //test get
    it("get all tasks, success", async() => {
        check = await request(app)
            .get("/api/tasks/62510bf3b9ee04bdd8e072aa")
        expect(check.statusCode).toEqual(200);
    });
});
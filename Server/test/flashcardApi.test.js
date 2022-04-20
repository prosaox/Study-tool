const request = require('supertest');
const db = require('../config/db')
const app = require('../app')

describe('testing flashcard', function() {

    beforeAll(function() {
        db.connectDB();
    });
    afterAll(function() {
        db.closeDatabase();
    });
    //test post
    it("add new flashcard, success", async() => {
        check = await request(app)
            .post("/api/flashcards")
            .send({
                courseId: "62510bf3b9ee04bdd8e072aa",
                title:"synonym",
                content: "same meaning"
            })
        expect(check.statusCode).toEqual(200);
    });
    it("add new flashcard, fail for not having title", async() => {
        check = await request(app)
            .post("/api/flashcards")
            .send({
                courseId: "62510bf3b9ee04bdd8e072aa",
                title:"",
                content: "same meaning"
            })
        expect(check.statusCode).toEqual(400);
    });
    it("add new flashcard, fail for not having definition", async() => {
        check = await request(app)
            .post("/api/flashcards")
            .send({
                courseId: "62510bf3b9ee04bdd8e072aa",
                title:"synonym",
                content: ""
            })
        expect(check.statusCode).toEqual(400);
    });
    it("add new flashcard, fail for having not existing courseId", async() => {
        check = await request(app)
            .post("/api/flashcards")
            .send({
                courseId: "723434",
                title:"synonym",
                content: "same meaning"
            })
        expect(check.statusCode).toEqual(500);
    });
    //test get 
    it("get all flashcard, success", async() => {
        check = await request(app)
            .get("/api/flashcards/62510bf3b9ee04bdd8e072aa")
        expect(check.statusCode).toEqual(200);
    });
});
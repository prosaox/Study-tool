const request = require('supertest');
const db = require('../config/db')
const app = require('../app')
describe('loading express', function() {
    beforeEach(function() {
        rounter = require('../routes/courseApi');

    });
    beforeAll(function() {
        db.connectDB();
    });
    afterAll(function() {
        // db.clear();
        db.closeDatabase();
    });
    it("empty test, should be error", async() => {
        const res = await request(app)
            .post("/api/courses")
        expect(res.statusCode).toEqual(400);
    });
    it("correct test, should be true", async() => {
        const res = await request(app)
            .post("/api/courses")
            .send({
                name: "4312",
            })
        expect(res.statusCode).toEqual(200);
    });
    // it('404 everything else', function testPath(done) {
    //     request(rounter)
    //         .get('/foo/bar')
    //         .expect(404, done);
    // });
});
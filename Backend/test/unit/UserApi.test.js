const db = require('../../config/db')
const server = require('../../server')
const request = require('supertest');

beforeAll(async() => await db.connectDB())
afterAll(async() => await db.closeDatabase())

describe("Create user tests", () => {
    it("empty name, should be error", async() => {
        const res = await request(server)
            .post('/routes/userApi')
            .send({
                name: '',
                email: 'fhawuehfu@gmail.com',
                password: '123456'
            })
        expect(res.statusCode).toEqual(400);
    });
});
describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})
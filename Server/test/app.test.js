var request = require('supertest');
describe('loading express', function() {
    var app;
    beforeEach(function() {
        app = require('../app');
    });
    // afterAll(function() {
    //     server.close();
    // });
    it('responds to /', function test(done) {
        request(app)
            .get('/')
            .expect("App up")
            .expect(200, done);
    });
    it('404 everything else', function test(done) {
        request(app)
            .get('/foo/bar')
            .expect(404, done);
    });
});
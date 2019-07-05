//Unit test for all get method in server side

const request = require('supertest');
const app = require('../app')

//Root
describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

//Get all task function
describe('Test get all tasks function', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/api/tasks/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

//Get one task function
describe('Test get one task function', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/api/tasks/5d1db21a4bedbc7c10c42e49').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

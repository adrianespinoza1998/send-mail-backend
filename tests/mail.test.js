const request = require('supertest');
const {app, server} = require('../dist/index');
const dataMailPrueba = require('./helpers/dataMailPrueba');

const api = request(app);

describe('POST send mail', () => {
    test('should be email sended', async() => {
        await api
        .post('/api/v1/mail/send')
        .send(dataMailPrueba)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/v1/mail').send(dataMailPrueba);

        expect(response.body.message).toBe('Email enviado');
    });

    afterAll(()=>{
        server.close();
    });
});
import supertest from 'supertest';
import  { app } from '../../index';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const data = {
        monedaOrigen: "PEN",
        monedaDestino: "USD",
        monto:800
    };
    const response = await supertest(app).post('/save-rate').send(data).expect(200);
    // expect(response.status).toBe(200);
    // expect(response.text).toBe('Hello World!');
  });

  it('should return 500 OK', async () => {
    const data = {
        monedaOrigen: "PEN",
        monedaDestino: "USD",
        monto:800.17127121
    };
    const response = await supertest(app).post('/save-rate').send(data).expect(200);
    // expect(response.status).toBe(200);
    // expect(response.text).toBe('Hello World!');
  });
});
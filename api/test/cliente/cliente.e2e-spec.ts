import { HttpStatus } from '@nestjs/common';
import { generate } from 'gerador-validador-cpf';
import * as request from 'supertest';
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  APP_URL,
  CLIENTE_EMAIL,
  CLIENTE_PASSWORD,
  FUNCIONARIO_EMAIL,
  FUNCIONARIO_PASSWORD,
  GERENTE_EMAIL,
  GERENTE_PASSWORD,
} from '../utils/constants';

describe('Auth (e2e)', () => {
  const app = APP_URL;
  let adminToken: any = {};
  let clienteToken: any = {};
  let funcionarioToken: any = {};
  let gerenteToken: any = {};

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        adminToken = body.token;
      });
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: CLIENTE_EMAIL, password: CLIENTE_PASSWORD })
      .then(({ body }) => {
        clienteToken = body.token;
      });
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: FUNCIONARIO_EMAIL, password: FUNCIONARIO_PASSWORD })
      .then(({ body }) => {
        funcionarioToken = body.token;
      });
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: GERENTE_EMAIL, password: CLIENTE_PASSWORD })
      .then(({ body }) => {
        gerenteToken = body.token;
      });
  });

  test('Apenas admins podem ler clientes: GET /api/v1/cliente/all', () => {
    // assert
    return request(app)
      .get('/api/v1/auth/email/login')
      .auth(adminToken, { type: 'bearer' })
      .expect(HttpStatus.OK);
  });

  test('Clientes, gerentes e funcionários podem ler a si mesmos apenas: GET /api/v1/cliente/me', async () => {
    // arrange
    let cliente: any = {};
    let admin: any = {};

    // act
    await request(app)
      .get('/api/v1/cliente/me')
      .auth(adminToken, { type: 'bearer' })
      .expect(HttpStatus.OK)
      .then((body) => {
        admin = body.body;
      });
    await request(app)
      .get('/api/v1/cliente/me')
      .auth(clienteToken, { type: 'bearer' })
      .expect(HttpStatus.OK)
      .then((body) => {
        admin = body.body;
      });

    // assert
    expect(admin?.email).toEqual(ADMIN_EMAIL);
    expect(cliente?.email).toEqual(CLIENTE_EMAIL);
  });
});

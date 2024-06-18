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

  describe('Admin', () => {
    test('Logar como admin: POST /api/v1/auth/email/login', () => {
      // assert
      return request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        })
        .expect(HttpStatus.OK);
    });
  });

  describe('Cliente', () => {
    test('Logar como cliente: POST /api/v1/auth/email/login', () => {
      // assert
      return request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: CLIENTE_EMAIL,
          password: CLIENTE_PASSWORD,
        })
        .expect(HttpStatus.OK);
    });

    test('Criar e logar cliente: POST /api/v1/auth/cliente/register', async () => {
      // arrange
      const randomCode = Math.random().toString(36).slice(-8);
      const randomEmail = `user_${randomCode}@test.com`;
      const randomPassword = randomCode;
      const randomCpf = generate();

      // assert

      // Deve criar usuário com sucsso
      await request(app)
        .post('/api/v1/auth/cliente/register')
        .send({
          email: randomEmail,
          password: randomPassword,
          nome: `Usuário ${randomCode} da Silva`,
          cpf: randomCpf,
          nascimento: '2000-04-30',
          endereco: 'Rua X',
        })
        .expect(HttpStatus.OK);
      
      // Deve logar com sucsso
      await request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: randomEmail,
          password: randomPassword,
        })
        .expect(HttpStatus.OK);
    });
  });

  describe('Funcionário', () => {
    test('Logar como funcionário: POST /api/v1/auth/email/login', () => {
      return request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: FUNCIONARIO_EMAIL,
          password: FUNCIONARIO_PASSWORD,
        })
        .expect(HttpStatus.OK);
    });
    
    test('Criar e logar funcionário: POST /api/v1/auth/funcionario/register', async () => {
      // arrange
      const randomCode = Math.random().toString(36).slice(-8);
      const randomEmail = `funcionario_${randomCode}@test.com`;
      const randomPassword = randomCode;
      const randomCpf = generate();

      // assert

      // Deve criar usuário com sucsso
      await request(app)
        .post('/api/v1/auth/funcionario/register')
        .send({
          email: randomEmail,
          password: randomPassword,
          nome: `Funcionário ${randomCode} da Silva`,
          nascimento: '2000-04-30',
          endereco: 'Rua X',
          cpf: randomCpf,
        })
        .expect(HttpStatus.OK);

      // Deve logar com sucsso
      await request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: randomEmail,
          password: randomPassword,
        })
        .expect(HttpStatus.OK);
    });
  });

  describe('Gerente', () => {
    test('Logar como gerente: POST /api/v1/auth/email/login', () => {
      return request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: GERENTE_EMAIL,
          password: GERENTE_PASSWORD,
        })
        .expect(HttpStatus.OK);
    });
  });

  // xtest('Reset user password', async () => {
  //   await request(APP_URL)
  //     .post('/api/v1/auth/forgot/password')
  //     .send({ email: LICENSEE_TEST_EMAIL })
  //     .expect(HttpStatus.ACCEPTED);
  //   const forgotLocalDate = new Date();
  //   forgotLocalDate.setMinutes(
  //     forgotLocalDate.getMinutes() + global.__localTzOffset,
  //   );

  //   const hash = await request(MAILDEV_URL)
  //     .get('/email')
  //     .then(({ body }) =>
  //       (body as any[])
  //         .filter(
  //           (letter: any) =>
  //             letter.to[0].address.toLowerCase() ===
  //               LICENSEE_TEST_EMAIL.toLowerCase() &&
  //             /.*reset\-password\/(\w+).*/g.test(letter.text) &&
  //             differenceInSeconds(forgotLocalDate, new Date(letter.date)) <= 10,
  //         )
  //         .pop()
  //         ?.text.replace(/.*reset\-password\/(\w+).*/g, '$1'),
  //     );

  //   const newPassword = Math.random().toString(36).slice(-8);
  //   await request(APP_URL)
  //     .post('/api/v1/auth/reset/password')
  //     .send({
  //       hash,
  //       password: newPassword,
  //     })
  //     .expect(HttpStatus.NO_CONTENT);

  //   await request(APP_URL)
  //     .post('/api/v1/auth/licensee/login')
  //     .send({ permitCode: LICENSEE_TEST_PERMIT_CODE, password: newPassword })
  //     .expect(HttpStatus.OK);
  // }, 60000);
});

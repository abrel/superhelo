import request from 'supertest';
import {
  createToken,
  createRefreshToken,
  tokenTTL,
  createChangePasswordToken,
} from '@@/services/jwt';
import { Roles } from '@@/constants/user';

describe('Auth routes', () => {
  const validEmailWithUserErrors = ' aLeX@SUpERhelo.fr  ';
  const password = 'password';

  const validAdminToken = createToken({
    id: '65d8601a5dc45fbf6c87a1e7',
    role: Roles.ADMIN,
  });

  let guardian: SH.User & { accessToken: string };

  beforeAll(async () => {
    const { body } = await request(`localhost:${process.env.PORT}`)
      .post('/users')
      .send({
        firstName: 'Alex',
        lastName: 'Brl',
        phone: '33607431159',
        role: Roles.GUARDIAN,
        email: validEmailWithUserErrors,
        password: 'password',
      })
      .expect(200);

    const { accessToken, expiresIn, refreshToken, ...rest } = body;
    expect(accessToken).toEqual(expect.any(String));
    expect(refreshToken).toEqual(expect.any(String));
    expect(expiresIn).toEqual(expect.any(Number));

    guardian = rest;
  });

  afterAll(async () => {
    await request(`localhost:${process.env.PORT}`)
      .delete(`/users/${guardian.id}`)
      .send({})
      .set('Authorization', `Bearer ${validAdminToken}`)
      .expect(200);
  });

  it('should not login with a wrong email', async () => {
    const email = 'do-not-exist@superhelo.fr';
    const { body } = await request(`localhost:${process.env.PORT}`)
      .post('/auth/login')
      .send({
        email,
        password,
        role: Roles.GUARDIAN,
      })
      .expect(403);

    expect(body.messageText).toEqual(`User with email ${email} is not found`);
  });

  it('should not login with a wrong password', async () => {
    const { body } = await request(`localhost:${process.env.PORT}`)
      .post('/auth/login')
      .send({
        email: validEmailWithUserErrors,
        password: 'wrong-password',
        role: Roles.GUARDIAN,
      })
      .expect(403);

    expect(body.messageText).toEqual('Password does not match');
  });

  it('should login', async () => {
    const { body } = await request(`localhost:${process.env.PORT}`)
      .post('/auth/login')
      .send({
        email: validEmailWithUserErrors,
        password,
        role: Roles.GUARDIAN,
      })
      .expect(200);

    expect(body).toHaveProperty('accessToken');
    expect(body).toHaveProperty('refreshToken');
    expect(body.expiresIn).toEqual(tokenTTL);
  });

  it('should fail to refresh the token', async () => {
    await request(`localhost:${process.env.PORT}`)
      .post('/auth/refresh')
      .send({
        refreshToken: 'fake-token',
      })
      .expect(401);
  });

  it('should refresh the token', async () => {
    const refreshToken = createRefreshToken({ id: guardian.id });
    const { body } = await request(`localhost:${process.env.PORT}`)
      .post('/auth/refresh')
      .send({
        refreshToken,
      })
      .expect(200);

    expect(body).toHaveProperty('accessToken');
    expect(body.refreshToken).toEqual(refreshToken);
    expect(body.expiresIn).toEqual(tokenTTL);
  });

  it('should logout', async () => {
    await request(`localhost:${process.env.PORT}`)
      .post('/auth/logout')
      .send({})
      .expect(200);
  });

  it('should request a reset password', async () => {
    await request(`localhost:${process.env.PORT}`)
      .post('/auth/reset-password')
      .send({ email: validEmailWithUserErrors, role: Roles.GUARDIAN })
      .expect(200);
  });

  it('should change the password', async () => {
    const { body } = await request(`localhost:${process.env.PORT}`)
      .post('/auth/change-password')
      .send({
        password: 'new-password',
        token: createChangePasswordToken({
          id: guardian.id,
        }),
      })
      .expect(200);

    expect(body.id).toEqual(guardian.id);

    await request(`localhost:${process.env.PORT}`)
      .post('/auth/login')
      .send({
        email: validEmailWithUserErrors,
        password: 'new-password',
        role: Roles.GUARDIAN,
      })
      .expect(200);
  });
});

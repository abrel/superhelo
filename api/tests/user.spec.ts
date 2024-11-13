import request from 'supertest';
import { createToken } from '@@/services/jwt';
import { Roles } from '@@/constants/user';

describe('User routes', () => {
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
        email: `test-${Date.now()}@superhelo.fr`,
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

  it('should fetch me', async () => {
    const myToken = createToken({
      id: guardian.id,
      role: Roles.GUARDIAN,
    });

    const { body } = await request(`localhost:${process.env.PORT}`)
      .get('/users/me')
      .set('Authorization', `Bearer ${myToken}`)
      .expect(200);

    expect(body).toMatchObject(guardian);
  });

  it('should fetch a user', async () => {
    const { body } = await request(`localhost:${process.env.PORT}`)
      .get(`/users/${guardian.id}`)
      .set('Authorization', `Bearer ${validAdminToken}`)
      .expect(200);
    expect(body).toMatchObject(guardian);
  });
});

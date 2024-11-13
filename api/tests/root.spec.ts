import request from 'supertest';

describe('Root routes', () => {
  it('should return app vitals', async () => {
    const { body } = await request(`localhost:${process.env.PORT}`)
      .get('/')
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        env: 'local',
        sha1: 'local',
        mongo: true,
      }),
    );

    expect(body.uptime).toBeGreaterThan(0);
  });
});

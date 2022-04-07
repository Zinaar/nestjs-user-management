process.env.TEST = 'true';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { userStub, wrongUserStub } from 'src/testing/stubs';
import mongoose from 'mongoose';
import { INestApplication } from '@nestjs/common';

jest.setTimeout(30000);

describe('users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  }, 30000);

  it('should create new user', async () => {
    await request(app.getHttpServer())
      .post('/user/signup')
      .send(userStub())
      .expect(201);
  });

  it('update', async () => {
    const res = await request(app.getHttpServer()).post('/user/login').send({
      username: userStub().username,
      password: userStub().password,
    });
    const token = 'Bearer ' + res.body.response.token;
    const firstname = 'givi';

    const updatedUser = await request(app.getHttpServer())
      .put(`/user/update?username=${userStub().username}`)
      .send({ firstname })
      .set('Authorization', token)
      .expect(200);

    expect(updatedUser.body.firstname).toEqual(firstname);
  });

  it('it should return token', async () => {
    await request(app.getHttpServer())
      .post('/user/login')
      .send({
        username: userStub().username,
        password: userStub().password,
      })
      .expect(201);
  });

  it('should not create new user', async () => {
    await request(app.getHttpServer())
      .post('/user/signup')
      .send(wrongUserStub())
      .expect(400);
  });

  it('should return 200 status', async () => {
    const res = await request(app.getHttpServer())
      .get(`/user/find?username=${userStub().username}`)
      .expect(200);

    expect(res.body.response.username).toEqual(userStub().username);
  });

  it('should return 200 status', async () => {
    await request(app.getHttpServer())
      .get(`/user/delete?username=${userStub().username}`)
      .expect(200);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await app.close();
  });
});

const request = require('supertest');
const express = require('express');
const service = require('../../src/service-config');

const {
  createJob,
  retrieveJobs,
  retrieveJob,
  updateJob,
  deleteJob,
} = require('../../src/datalayer/fake-database');

jest.mock('../../src/datalayer/fake-database', () => ({
  __esModule: true,
  createJob: jest.fn(),
  retrieveJobs: jest.fn(),
  retrieveJob: jest.fn(),
  updateJob: jest.fn(),
  deleteJob: jest.fn(),
}));

const app = service(express());

describe('jobs.test.js', () => {
  let server;

  beforeEach(() => {
    server = app.listen(3000);
  });

  afterEach(() => {
    server.close();
  });

  describe('retrieveJobs', () => {
    test('successful call', async () => {
      const record = [{
        id: 123,
        title: 'job A',
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
        created: 1611254560294,
      }];

      retrieveJobs.mockReturnValueOnce(record);

      const res = await request(app).get('/jobs');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(record);
    });
    test('error call', async () => {
      retrieveJobs.mockImplementation(() => {
        throw new Error('mock error');
      });

      const res = await request(app).get('/jobs');
      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({message: 'mock error'});
    });
  });

  describe('retrieveJob', () => {
    test('successful call', async () => {
      const record = {
        id: 123,
        title: 'job A',
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
        created: 1611254560294,
      };

      retrieveJob.mockReturnValueOnce(record);

      const res = await request(app).get('/jobs/123');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(record);
    });
    test('record not found', async () => {
      retrieveJob.mockReturnValueOnce(null);
      const res = await request(app).get('/jobs/123');
      expect(res.status).toBe(404);
      expect(res.body).toStrictEqual({
        message: 'Job not found'
      });
    });
    test('failed call - bad id', async () => {
      const res = await request(app).get('/jobs/abc');
      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({
        message: 'Id provided was not a number'
      });
    });
    test('failed call - internal error', async () => {
      retrieveJob.mockImplementation(() => {
        throw new Error('mock error');
      });

      const res = await request(app).get('/jobs/123');
      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({message: 'mock error'});
    });
  });

  describe('createJob', () => {
    test('successful call', async () => {
      const payload = {
        title: 'job A',
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
      };

      const record = {
        id: 123,
        created: 1611254560294,
        ...payload,
      };

      createJob.mockReturnValueOnce(record);

      const res = await request(app).post('/jobs/').send(payload);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(record);
    });
  });
  test('failed call', async () => {
    const payload = {
      title: 'job A',
      description: 'This is a fake job',
      email: 'jobsa@jobs.com',
    };

    createJob.mockImplementation(() => {
      throw new Error('mock error');
    });

    const res = await request(app).post('/jobs/').send(payload);
    expect(res.status).toBe(500);
    expect(res.body).toStrictEqual({
      message: 'mock error',
    });
  });
  describe('deleteJob', () => {
    test('successful call', async () => {
      deleteJob.mockReturnValueOnce(true);
      const res = await request(app).delete('/jobs/123');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({
        message: 'job deleted',
      });
    });
    test('failed call - record missing', async () => {
      deleteJob.mockReturnValueOnce(false);
      const res = await request(app).delete('/jobs/123');
      expect(res.status).toBe(404);
      expect(res.body).toStrictEqual({
        message: 'Job not found',
      });
    });
    test('failed call - bad id', async () => {
      deleteJob.mockReturnValueOnce(false);
      const res = await request(app).delete('/jobs/abc');
      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({
        message: 'Id provided was not a number',
      });
    });
  });
  describe('updateJob', () => {
    test('successful call', async () => {
      const payload = {
        title: 'job A',
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
      };

      const record = {
        id: 123,
        created: 1611254560294,
        ...payload,
      };

      updateJob.mockReturnValueOnce(record);
      const res = await request(app).put('/jobs/123').send(payload);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(record);
    });

    test('failed call - bad id', async () => {
      const payload = {
        title: 'job A',
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
      };
      const res = await request(app).put('/jobs/abc').send(payload);
      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({
        message: 'Id provided was not a number',
      });
    });

    test('failed call - internal error', async () => {
      const payload = {
        title: 'job A',
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
      };

      updateJob.mockImplementation(() => {
        throw new Error('mock error');
      });

      const res = await request(app).put('/jobs/123').send(payload);
      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({
        message: 'mock error',
      });
    });
    test('failed call - not found', async () => {
      const payload = {
        title: 'job A',
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
      };

      updateJob.mockReturnValueOnce(null);

      const res = await request(app).put('/jobs/123').send(payload);
      expect(res.status).toBe(404);
      expect(res.body).toStrictEqual({
        message: 'Job not found',
      });
    });
  });
});

const request = require('supertest');
const express = require('express');
const service = require('../src/service-config');

const app = service(express());

describe('service-config.test.js', () => {
  let server;

  beforeEach(() => {
    server = app.listen(3000);
  });

  afterEach(() => {
    server.close();
  });
  describe('getJobs', () => {
    test('successful call', async () => {

      const query = `{
        jobs{
          id,
          title,
          description,
          email,
          created
        }
      }`;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({
        data: {
          jobs: [
            {
              created: 1611254560294,
              description: 'This is a fake job',
              email: 'jobsa@jobs.com',
              id: 123,
              title: 'job A',
            },
            {
              created: 1611254580173,
              description: 'This is a fake job',
              email: 'jobsb@jobs.com',
              id: 456,
              title: 'job B',
            },
            {
              created: 1611254587496,
              description: 'This is a fake job',
              email: 'jobsc@jobs.com',
              id: 789,
              title: 'job C',
            },
          ],
        },
      });
    });
    test('failed call', async () => {

      const query = `{
        jobs{
          idt,
          title,
          description,
          email,
          created
        }
      }`;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        errors: [
          {
            locations: [
              {
                column: 11,
                line: 3,
              },
            ],
            message: 'Cannot query field "idt" on type "Job". Did you mean "id"?',
          },
        ],
      });
    });
  });
  describe('getJob', () => {
    test('successful call', async () => {
      const query = `{
        job(id: 123){
          id,
          title,
          description,
          email,
          created
        }
      }`;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({
        data: {
          job: {
            created: 1611254560294,
            description: 'This is a fake job',
            email: 'jobsa@jobs.com',
            id: 123,
            title: 'job A',
          },
        },
      });
    });
    test('failed call', async () => {
      const query = `{
        job(id: 123){
          idt,
          title,
          description,
          email,
          created
        }
      }`;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        errors: [
          {
            locations: [
              {
                column: 11,
                line: 3,
              },
            ],
            message: 'Cannot query field "idt" on type "Job". Did you mean "id"?',
          },
        ],
      });
    });
  });
  describe('updateJob', () => {
    test('successful call', async () => {
      const query = `
        mutation{
          updateJob(
              id:123,
              input: {
                  title: "A updated Title",
                  description: "A updated decription",
                  email: "fake@email.com",
              }
          ) {
              id,
              title,
              description,
              email,
              created
          }
        }
      `;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({
        data: {
          updateJob: {
            created: 1611254560294,
            description: 'A updated decription',
            email: 'fake@email.com',
            id: 123,
            title: 'A updated Title',
          },
        },
      });
    });
    test('failed call', async () => {
      const query = `
        mutation{
          updateJob(
              id:123,
              input: {
                  titddle: "A updated Title",
                  description: "A updated decription",
                  emdail: "fake@email.com",
              }
          ) {
              id,
              title,
              description,
              email,
              created
          }
        }
      `;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        errors: [
          {
            locations: [
              {
                column: 22,
                line: 5,
              },
            ],
            message: 'Field "JobInput.title" of required type "String!" was not provided.',
          },
          {
            locations: [
              {
                column: 22,
                line: 5,
              },
            ],
            message: 'Field "JobInput.email" of required type "String!" was not provided.',
          },
          {
            locations: [
              {
                column: 19,
                line: 6,
              },
            ],
            message: 'Field "titddle" is not defined by type "JobInput". Did you mean "title"?',
          },
          {
            locations: [
              {
                column: 19,
                line: 8,
              },
            ],
            message: 'Field "emdail" is not defined by type "JobInput". Did you mean "email"?',
          },
        ],
      });
    });
  });
  describe('createJob', () => {
    test('successful call', async () => {
      const query = `
        mutation{
          createJob(input: {
            title: "A new Title",
            description: "A new decription",
            email: "fake@email.com",
          }) {
            id,
            title,
            description,
            email,
            created
        }
      }`;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: {
          createJob: {
            description: 'A new decription',
            email: 'fake@email.com',
            title: 'A new Title',
          },
        },
      });
    });
    test('failed call', async () => {
      const query = `
        mutation{
          createJob(input: {
            title: "A new Title",
            descrisption: "A new decription",
            emadil: "fake@email.com",
          }) {
            id,
            title,
            description,
            email,
            created
        }
      }`;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        errors: [
          {
            locations: [
              {
                column: 28,
                line: 3,
              },
            ],
            message: 'Field "JobInput.description" of required type "String!" was not provided.',
          },
          {
            locations: [
              {
                column: 28,
                line: 3,
              },
            ],
            message: 'Field "JobInput.email" of required type "String!" was not provided.',
          },
          {
            locations: [
              {
                column: 13,
                line: 5,
              },
            ],
            message: 'Field "descrisption" is not defined by type "JobInput". Did you mean "description"?',
          },
          {
            locations: [
              {
                column: 13,
                line: 6,
              },
            ],
            message: 'Field "emadil" is not defined by type "JobInput". Did you mean "email"?',
          },
        ],
      });
    });
  });
  describe('deleteJob', () => {
    test('successful call', async () => {
      const query = `
        mutation{
          deleteJob(
            id:123, 
          )
        }`;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(200);
      const sndQuery = `{
        job(id: 123){
          id,
          title,
          description,
          email,
          created
        }
      }`;

      // check job is gone
      const sndRes = await request(app).post('/graphql').send({query:sndQuery});
      expect(sndRes.status).toBe(200);
      expect(sndRes.body).toStrictEqual({
        data: {
          job: null,
        },
      });
    });
    test('record does not exist', async () => {
      const query = `
        mutation{
          deleteJob(
            id:999, 
          )
        }`;

      const res = await request(app).post('/graphql').send({query});
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({
        data: {
          deleteJob: false,
        }
      });
    });
  });
});

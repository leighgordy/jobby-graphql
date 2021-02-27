const {
  retrieveJobs,
  retrieveJob,
  deleteJob,
  createJob,
  updateJob,
} = require('../../src/datalayer/fake-database');

describe('fake-database.test.js', ()=>{
  test('retrieveJobs', () => {
    expect(retrieveJobs()).toStrictEqual([
      {
        created: 1611254560294,
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
        id: 123,
        title: 'job A'
      },
      {
        created: 1611254580173,
        description: 'This is a fake job',
        email: 'jobsb@jobs.com',
        id: 456,
        title: 'job B'
      },
      {
        created: 1611254587496,
        description: 'This is a fake job',
        email: 'jobsc@jobs.com',
        id: 789,
        title: 'job C',
      }
    ]);
  });

  describe('retrieveJob', () => {
    test('successful call', () => {
      expect(retrieveJob(789)).toStrictEqual({
        'created': 1611254587496,
        'description': 'This is a fake job',
        'email': 'jobsc@jobs.com',
        'id': 789,
        'title': 'job C',
      });
    });
    test('successful call wrong id', () => {
      expect(retrieveJob(666)).toBeUndefined();
    });
    test('failed call missing id', (done) => {
      try {
        retrieveJob(null);
        done.fail();
      } catch(err){
        expect(err.message).toBe('Missing id.');
        done();
      }
    });
  });

  describe('deleteJob', () => {
    test('successful call', () => {
      expect(deleteJob(789)).toBe(true);
      expect(retrieveJob(789)).toBeUndefined();
    });
    test('successful call wrong id', () => {
      deleteJob(999);
      expect(deleteJob(999)).toBe(false);
    });
    test('failed call missing id', (done) => {
      try {
        deleteJob(null);
        done.fail();
      } catch(err){
        expect(err.message).toBe('Missing id.');
        done();
      }
    });
  });

  describe('createJob', () => {
    test('successful call', () => {
      const newJob = createJob({
        title: 'newTitle',
        description: 'new description',
        email: 'newemail@newemail.com',
      });
      expect(newJob).not.toBeNull();
      const retrieveRecord = retrieveJob(newJob.id);
      expect(newJob).toStrictEqual(retrieveRecord);
    });
    test('failed call missing title', (done) => {
      try {
        createJob({
          title: null,
          description: 'new description',
          email: 'newemail@newemail.com',
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either title, description or email.');
        done();
      }
    });
    test('failed call missing description', (done) => {
      try {
        createJob({
          title: 'newTitle',
          description: null,
          email: 'newemail@newemail.com',
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either title, description or email.');
        done();
      }
    });
    test('failed call missing email', (done) => {
      try {
        createJob({
          title: 'newTitle',
          description: 'new description',
          email: null,
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either title, description or email.');
        done();
      }
    });
    test('failed call invalid email', (done) => {
      try {
        createJob({
          title: 'newTitle',
          description: 'new description',
          email: 'newemailnewemailcom',
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Email address \'newemailnewemailcom\' invalid.');
        done();
      }
    });
  });

  describe('updateJob', () => {
    let id = null;
    beforeAll(() => {
      const job = createJob({
        title: 'updateMe',
        description: 'needs updating',
        email: 'oldemail@oldemail.com'
      });
      id = job.id;
      expect(id).not.toBeUndefined();
    });

    test('successful call', () => {
      const updatedJob = updateJob(id, {
        title: 'updated',
        description: 'recently updated',
        email: 'updatedemail@updatedemail.com',
      });
      const retrieveRecord = retrieveJob(id);
      expect(updatedJob).toStrictEqual(retrieveRecord);
    });

    test('failed call missing id', (done) => {
      try {
        updateJob(null, {
          title: 'updated',
          description: 'recently updated',
          email: 'updatedemail@updatedemail.com',
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either id, title, description or email.');
        done();
      }
    });

    test('failed call missing title', (done) => {
      try {
        updateJob(id, {
          title: null,
          description: 'recently updated',
          email: 'updatedemail@updatedemail.com',
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either id, title, description or email.');
        done();
      }
    });

    test('failed call missing description', (done) => {
      try {
        updateJob(id, {
          title: 'updated',
          description: null,
          email: 'updatedemail@updatedemail.com',
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either id, title, description or email.');
        done();
      }
    });

    test('failed call missing email', (done) => {
      try {
        updateJob(id, {
          title: 'updated',
          description: 'recently updated',
          email: null,
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either id, title, description or email.');
        done();
      }
    });
    test('failed call invalid email', (done) => {
      try {
        updateJob(id, {
          title: 'updated',
          description: 'recently updated',
          email: 'updatedemailupdatedemailcom',
        });
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Email address \'updatedemailupdatedemailcom\' invalid.');
        done();
      }
    });
  });
});

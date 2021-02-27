let jobs = [
  {
    id: 123,
    title: 'job A',
    description: 'This is a fake job',
    email: 'jobsa@jobs.com',
    created: 1611254560294,
  },
  {
    id: 456,
    title: 'job B',
    description: 'This is a fake job',
    email: 'jobsb@jobs.com',
    created: 1611254580173,
  },
  {
    id: 789,
    title: 'job C',
    description: 'This is a fake job',
    email: 'jobsc@jobs.com',
    created: 1611254587496,
  }
];

exports.createJob = (payload) => {
  const {
    title,
    description,
    email,
  } = payload;
  if(title == null || description == null || email == null) {
    throw new Error('Missing either title, description or email.');
  }
  if(!/\S+@\S+\.\S+/.test(email)) {
    throw new Error(`Email address '${email}' invalid.`);
  }
  const newJob = {
    id: (Date.now() + Math.floor(Math.random() * 1000000000000) + 1),
    title,
    description,
    email,
    created: Date.now(),
  };
  jobs.push(newJob);
  return newJob;
};

exports.retrieveJobs = () => jobs;

exports.retrieveJob = (id) => {
  if(id == null) {
    throw new Error('Missing id.');
  }
  return jobs.find((job) => job.id === id);
};

exports.updateJob = (id, payload) => {
  const {
    title,
    description,
    email,
  } = payload;
  if(id == null || title == null || description == null || email == null) {
    throw new Error('Missing either id, title, description or email.');
  }
  if(!/\S+@\S+\.\S+/.test(email)) {
    throw new Error(`Email address '${email}' invalid.`);
  }
  let updatedJob = null;
  jobs = jobs.map((job) => {
    if(job.id === id) {
      updatedJob = {
        ...job,
        title,
        description,
        email,
      };
      return updatedJob;
    }
    return job;
  });
  return updatedJob;
};

exports.deleteJob = (id) => {
  if(id == null) {
    throw new Error('Missing id.');
  }
  const length = jobs.length;
  jobs = jobs.filter((job) => job.id !== id);
  return jobs.length < length;
};

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

const {
  retrieveJobs,
  retrieveJob,
  deleteJob,
  updateJob,
  createJob,
} = require('../../src/datalayer/fake-database');

/**
 * @swagger
 *
 * /jobs:
 *   get:
 *     summary: Retrieve jobs.
 *     produces:
 *       - application/json
 *     responses:
 *      '200':
 *        description: jobs returned
 *      '500':
 *        description: Error has occurred
 */
router.get('/',  (req, res) => {
  res.json(retrieveJobs());
});

/**
 * @swagger
 *
 * /jobs/{id}:
 *   get:
 *     summary: Retrieve job.
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: A unique id used by job database
 *     produces:
 *       - application/json
 *     responses:
 *      '200':
 *        description: jobs returned
 *      '404':
 *        description: job not found
 *      '500':
 *        description: error has occurred
 */
router.get('/:id', (req, res) => {
  const jobId = Number(req.params.id);
  if(isNaN(jobId)) {
    throw new Error('Id provided was not a number');
  }
  const results = retrieveJob(jobId);
  if(results == null) {
    res.status(404).json({ message: 'Job not found' });
  } else {
    res.json(results);
  }
});

/**
 * @swagger
 *
 * /jobs/{id}:
 *   delete:
 *     summary: Delete job.
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: A unique id used by job database
 *     produces:
 *       - application/json
 *     responses:
 *      '200':
 *        description: job deleted
 *      '404':
 *        description: job not found
 *      '500':
 *        description: error has occurred
 */
router.delete('/:id',  (req, res) => {
  const jobId = Number(req.params.id);
  if(isNaN(jobId)) {
    throw new Error('Id provided was not a number');
  }
  if(deleteJob(jobId)) {
    res.json({ message: 'job deleted' });
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update job.
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         example: 123
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: A unique id used by job database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The user's name.
 *                 example: new title
 *                 required: true
 *               description:
 *                 type: string
 *                 description: The user's name.
 *                 example: new description
 *                 required: true
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: newemail@email.com
 *                 required: true
 *     responses:
 *        '200':
 *          description: job updated
 *        '404':
 *          description: job not found
 *        '500':
 *          description: error has occurred
 */
router.put('/:id',  jsonParser, (req, res) => {
  const jobId = Number(req.params.id);
  if(isNaN(jobId)) {
    throw new Error('Id provided was not a number');
  }
  const updatedJob = updateJob(jobId, req.body);
  if(updatedJob === null) {
    res.status(404).json({ message: 'Job not found' });
  } else {
    res.json(updatedJob);
  }
});

/**
 * @swagger
 * /jobs/:
 *   post:
 *     summary: Create job.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The user's name.
 *                 example: new title
 *                 required: true
 *               description:
 *                 type: string
 *                 description: The user's name.
 *                 example: new description
 *                 required: true
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: newemail@email.com
 *                 required: true
 *     responses:
 *        '200':
 *          description: job updated
 *        '500':
 *          description: error has occurred
 */
router.post('/',  jsonParser, (req, res) => {
  res.json(createJob(req.body));
});

module.exports = router;

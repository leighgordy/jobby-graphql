const errorHandler = require('../src/error-handler');

describe('fake-database.test.js', ()=> {
  let resCode = null;
  const err = {
    message: 'Im not real',
  };
  const req = null;
  const res = {
    headersSent: false,
    status: (responseCode) => {
      resCode = responseCode;
      return res;
    },
    json: jest.fn(),
  };
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    res.headersSent = false;
  });

  test('Test express logic for asynchronous errors invoked by route handlers and middleware', () => {
    res.headersSent = true;
    const callExpress = jest.fn();
    next.mockReturnValue(callExpress);
    const result = errorHandler(err, req, res, next);
    expect(result).toBe(callExpress);
  });
  test('Test express logic for synchronous errors', () => {
    errorHandler(err, req, res, next);
    expect(resCode).toBe(500);
    expect(res.json.mock.calls[0][0]).toStrictEqual({
      message: 'Im not real'
    });
  });
});

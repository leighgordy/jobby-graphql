const express = require('express');
const service = require('./service-config');
const app = express();

const port = 3000;

service(app);

app.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`app listening at http://localhost:${port}/graphql`);
});

const app = require('./app');
const server = require('https').Server(app);

// https://github.com/foreverjs/forever
// use forever.js to restart the server if it crashes.


server.listen(9000, () => {
  console.log('Express is listening on port 9000.');
});

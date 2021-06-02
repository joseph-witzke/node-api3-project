const express = require('express');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares and the user's router need to be connected here
const userRouter = require('./users/users-router')
const { logger } = require('./middleware/middleware')

server.use('/api/users', userRouter)

server.use(logger)

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: 'something went wrong with your request',
    message: err.message,
    stack: err.stack,
  })
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

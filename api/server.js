const express = require('express');
const userRouter = require('./users/users-router')
const { logger } = require('./middleware/middleware')
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(logger)
server.use('/api/users', userRouter)



server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    custom: 'something went wrong with your request',//This error handling middleware could be put at the end of users-router
    message: err.message,
    stack: err.stack,
  })
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);//To hit this dummy endpoint, just Postman http://localhost:5000
});

module.exports = server;

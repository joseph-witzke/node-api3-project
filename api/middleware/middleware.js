
const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.path}`);
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          error: 'user not found'
        })
      } else {
        req.user = user
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function validateUser(req, res, next) {
  const { name } = req.body
  if (!name) {
    res.status(400).json({message: 'missing required name field' })
  } else {
    req.user = { name: req.body.name }
    next( )
  }
}

function validatePost(req, res, next) {
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({message: 'missing required text field' })
  } else {
    req.text = text.trim()
    next( )
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
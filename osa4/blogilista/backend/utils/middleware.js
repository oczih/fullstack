const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    }else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' }) 
    }
    
    next(error)
  }

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
  
    if (authorization && authorization.startsWith('Bearer ')){
      request.token = authorization.replace('Bearer ', '')
      return next()
    }
    request.token = null
    return next()
}

const userExtractor = async (request, response, next) => {
  try {
      if (!request.token) {
          return response.status(401).json({ error: 'token missing' })
      }
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!decodedToken.id) {
          return response.status(401).json({ error: 'token invalid' })
      }

      request.user = await User.findById(decodedToken.id)
      if (!request.user) {
          return response.status(401).json({ error: 'user not found' })
      }
      next()
  } catch (error) {
      next(error);
  }
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
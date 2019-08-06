const express = require('express')

const { doRemove } = require('../controllers/deletes')

const Router = express.Router()

Router.delete('/auth/delete?:query', doRemove)

module.exports = app => app.use(Router)

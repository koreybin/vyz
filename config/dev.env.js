'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"//192.168.1.71:8001"',
  // BASE_API: '"localhost:8080"',
})




/**
 * Define the request router
 */
const handlers = require('./handlers')

//Handle all requests of type get
const get = {
    'ping':handlers.ping
    
}

//handle all requests of type post
const post = {
    'hello':handlers.hello
}
module.exports = {
    get,
    post
}
  
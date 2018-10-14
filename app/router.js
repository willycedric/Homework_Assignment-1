/**
 * Define the request router
 */
const handlers = require('./handlers')
module.exports = {
    'ping':handlers.ping,
    'hello':handlers.hello
}
  
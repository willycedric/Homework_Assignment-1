
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder;
const router = require('./router')
const handlers = require('./handlers')
module.exports = (req,res) =>{

    // Parse the url
    const parsedUrl = url.parse(req.url, true)
  
    // Get the path
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  
    // Get the query string as an object
    const queryStringObject = parsedUrl.query
  
    // Get the HTTP method
    const method = req.method.toLowerCase()
  
    //Get the headers as an object
    const headers = req.headers
  
    // Get the payload,if any
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    req.on('data', (data)=>{
        buffer += decoder.write(data)
    })
    req.on('end', ()=>{
        buffer += decoder.end()
  
        // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound
  
        // Construct the data object to send to the handler
        const data = {
          'trimmedPath' : trimmedPath,
          'queryStringObject' : queryStringObject,
          'method' : method,
          'headers' : headers,
          'payload' : buffer
        }
  
        // Route the request to the handler specified in the router
        chosenHandler(data,(statusCode,payload)=>{
  
          // Use the status code returned from the handler, or set the default status code to 200
          statusCode = typeof(statusCode) == 'number' ? statusCode : 200
  
          // Use the payload returned from the handler, or set the default payload to an empty object
          payload = typeof(payload) == 'object'? payload : {}
  
          // Convert the payload to a string
          var payloadString = JSON.stringify(payload.payload, null, 4)
  
          // Return the response
          res.setHeader('Content-Type', 'application/json')
          res.writeHead(statusCode)
          res.end(payloadString)
          console.log("Returning this response: ",statusCode,payloadString)
  
        })
  
    })
  }
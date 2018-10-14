
/**
 * Define all the handlers
 */

//ping handler
ping = (data,callback)=>{
  callback(200)
}

// Not found handler
notFound = (data,callback)=>{
  callback(404)
}

/**
 * Hello World handler
 * Returns the date sent by the caller
 * and a 202 status code
 */
hello = (data, callback)=>{
    callback(202, {"message":"Hello from the Hello API"})
}

module.exports ={
    ping,
    hello,
    notFound
}
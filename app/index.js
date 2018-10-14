/**
 * Entry file of the api
 */

 //Import the built-in http module
 const http = require('http')
 //Import the server logic
 const server= require('./server')
 //Import the configuration file
 const config = require('./config')
 const app = require('express')()
//instantiate the http server
 const httpServer = http.createServer((req, res)=>{
    server(req, res)
 })

 app.post('/',(req,res)=>{
     
 })

 //start the http server
 httpServer.listen(config.httpPort, ()=>{
     console.log(` Server is running on the ${config.envName} environnment and  listening on the port ${config.httpPort}.`)
 })


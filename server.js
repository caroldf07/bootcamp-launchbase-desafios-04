const express = require('express')
const routes = require('./routes')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    noCache: false
})



server.listen(5000)
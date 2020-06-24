const express = require('express')
const routes = require('./routes')
const nunjucks = require('nunjucks')
const { urlencoded } = require('express')

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(routes)
server.use(express.static('public'))



server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    noCache: false
})



server.listen(5000)
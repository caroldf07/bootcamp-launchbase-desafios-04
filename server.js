const express = require('express')
const methodOverride = require('method-override')
const routes = require('./routes')
const nunjucks = require('nunjucks')
const { urlencoded } = require('express')

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    noCache: false
})



server.listen(5000)
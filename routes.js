const express = require('express')
const routes = express.Router()

routes.get("/", (req,res) => {
    return res.render("index")
})

// routes.get("/instructors", (req,res) => {
//     return res.render("instructors")
// })

// routes.get("/students", (req,res) => {
//     return res.render("students")
// })

routes.use(function(req, res) {
    res.status(404).render("not-found");
  })


module.exports = routes
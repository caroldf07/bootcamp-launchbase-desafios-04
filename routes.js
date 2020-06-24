const express = require('express')
const routes = express.Router()
const instructors = require('./public/instructors/instructors')

routes.get("/", (req,res) => {
  return res.redirect("instructors")
})

routes.get("/instructors", (req,res) => {
    return res.render("instructors/index")
})

routes.post("/instructors", instructors.post)

routes.get("/instructors/create", (req,res) => {
    return res.render("instructors/create")
})

// routes.get("/students", (req,res) => {
//     return res.render("students")
// })

routes.use(function(req, res) {
    res.status(404).render("not-found");
  })


module.exports = routes
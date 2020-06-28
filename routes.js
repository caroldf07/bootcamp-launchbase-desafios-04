const express = require('express')
const routes = express.Router()
const instructors = require('./public/instructors/instructors')
const students = require('./public/students/students')

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

routes.get("/instructors/:id", instructors.show)

routes.get("/instructors/:id/edit", instructors.edit)

routes.put("/instructors", instructors.put)

routes.delete("/instructors", instructors.delete)

routes.get("/students", (req,res) => {
  return res.render("students/index")
})

routes.post("/students", students.post)

routes.get("/students/create", (req,res) => {
  return res.render("students/create")
})

routes.get("/students/:id", students.show)

routes.get("/students/:id/edit", students.edit)

routes.put("/students", students.put)

routes.delete("/students", students.delete)

routes.use(function(req, res) {
    res.status(404).render("not-found");
  })


module.exports = routes
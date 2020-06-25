const fs = require('fs')
const data = require('../../data.json')
const age = require ("../utils")


exports.show = function (req,res){
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if(!foundInstructor){
        return res.send("Instrutor não encontrado")
    }

    const infos = {
        ...foundInstructor,
        age: "",
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
        disciplines: foundInstructor.disciplines.split(","),
        classes: foundInstructor.classes.split(",")
    }

    return res.render("instructors/show", { infos })
}

exports.post = function (req,res) {
    const keys = Object.keys(req.body)

    for(let key of keys){
        if (req.body[key] == ""){
            return res.send ("Preencha todos os campos")
        }
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.id = Number(data.instructors.length + 1)
    req.body.created_at = Date.now()

    const { id, photo, name, birth, main, disciplines, classes, created_at} = req.body

    data.instructors.push({
        id,
        photo,
        name,
        birth,
        main,
        disciplines,
        classes,
        created_at
    })

    fs.writeFile("data.json",JSON.stringify(data,null,4), function(err){
        if(err){
            return res.send("Write file error")
        }
        return res.redirect("/instructors")
    })
}
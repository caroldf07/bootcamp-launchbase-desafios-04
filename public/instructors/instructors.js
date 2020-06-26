const fs = require('fs')
const data = require('../../data.json')
const { age, birthDate } = require ("../utils")

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
        age: age(foundInstructor.birth),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
        disciplines: foundInstructor.disciplines.split(","),
        classes: foundInstructor.classes.split(",")
    }

    return res.render("instructors/show", { infos })
}

exports.edit = function (req,res){
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if(!foundInstructor){
        return res.send("Instrutor não encontrado")
    }

    const infos = {
        ...foundInstructor,
        birth: birthDate(foundInstructor.birth)
    }


    return res.render("instructors/edit", { infos})
}

exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if(instructor.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor){
        return res.send("Instrutor não encontrado")
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data,null,4), function(err){
        if (err){
            return res.send("Erro no registro")
        }
        return res.redirect(`/instructors/${ id }`)
    })
}

exports.delete = function(req,res){
    const { id } = req.body

    const filterInstructor = data.instructors.filter( function(instructor){
       return instructor.id != id
    })
       data.instructors = filterInstructor

       fs.writeFile("data.json",JSON.stringify(data,null,4),function(err){
           if(err){
               return res.send("Erro ao deletar")
           }
           return res.redirect("/instructors")
       })
}
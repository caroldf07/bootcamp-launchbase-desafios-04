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
    req.body.id = Number(data.students.length + 1)
    req.body.created_at = Date.now()

    const { id, photo, name, birth, email, main, belt, disciplines, created_at} = req.body

    data.students.push({
        id,
        photo,
        name,
        birth,
        email,
        main,
        belt,
        disciplines,
        created_at
    })

    fs.writeFile("data.json",JSON.stringify(data,null,4), function(err){
        if(err){
            return res.send("Write file error")
        }
        return res.redirect("/students")
    })
}

exports.show = function (req,res){
    const { id } = req.params

    const foundStudent = data.students.find((student) => {
        return student.id == id
    })

    if(!foundStudent){
        return res.send("aluno não encontrado")
    }

    const infos = {
        ...foundStudent,
        age: age(foundStudent.birth),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at),
        disciplines: foundStudent.disciplines.split(","),
    }

    return res.render("students/show", { infos })
}

exports.edit = function (req,res){
    const { id } = req.params

    const foundStudent = data.students.find((student) => {
        return student.id == id
    })

    if(!foundStudent){
        return res.send("aluno não encontrado")
    }

    const infos = {
        ...foundStudent,
        birth: birthDate(foundStudent.birth)
    }


    return res.render("students/edit", { infos})
}

exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find((student, foundIndex) => {
        if(student.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundStudent){
        return res.send("aluno não encontrado")
    }

    const student = {
        id: Number(req.body.id),
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data,null,4), function(err){
        if (err){
            return res.send("Erro no registro")
        }
        return res.redirect(`/students/${ id }`)
    })
}

exports.delete = function(req,res){
    const { id } = req.body

    const filterstudent = data.students.filter( function(student){
       return student.id != id
    })
       data.students = filterstudent

       fs.writeFile("data.json",JSON.stringify(data,null,4),function(err){
           if(err){
               return res.send("Erro ao deletar")
           }
           return res.redirect("/students")
       })
}

exports.index = function (req,res) {
    return res.render("students/index", { students: data.students })
}
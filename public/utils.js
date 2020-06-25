module.exports = {
    age:function(timestamp){
        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getFullYear() - birth.getFullYear()
        const month = today.getMonth() - birth.getMonth()

            if(month < 0 || month == 0 && today.getDate() <= birth.getDate()){
                age = age - 1
            }
        return age
    },

    birthDate: function(timestamp){
        const birthDate = new Date(timestamp)

        const year = birthDate.getUTCFullYear()
        const birthMonth = `0${birthDate.getUTCMonth() + 1}`.slice(0,2)
        const day = `0${birthDate.getUTCDate()}`.slice(0,2)

        return (`${year}-${birthMonth}-${day}`)
    }
}
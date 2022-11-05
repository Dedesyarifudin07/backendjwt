const mongoose = require('mongoose');

const siswa = mongoose.model('Siswa', 
    {   
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            unique:true,
            required:true,
            max:8
        },
        createAt:{
            type:Date,
            create:new Date().getDate()
        }
    }
)

module.exports= siswa;
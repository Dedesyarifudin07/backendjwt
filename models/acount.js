
const mongoose = require('mongoose');

const acount = mongoose.model('Acount', 
    {   
        name:{
            type: String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
            maxlength:100
        },
        createAT:{
            type:Date,
            create:new Date().getDate()
        }

    }
)

module.exports = acount;

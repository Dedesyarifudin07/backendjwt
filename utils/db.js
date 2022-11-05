const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology :true,
});

let db = mongoose.connection;
db.on('error', console.error.bind(console,'connect to database failed'));
db.once('open',() => {
    console.log('Databases Conect');
})


// const acount = require('../models/acount');

// const acount1 = new acount({
//     name:"Dede syarifudin",
//     email:"dede@gmail.com",
//     password:"sadfasdajdbadasdas;d"
// })

// //simpan ke collectiond
// acount1.save().then((acount) => console.log(acount)) 


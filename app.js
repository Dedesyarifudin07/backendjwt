const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const userControlers = require('./routes/userControlers');
const acountControllers= require('./routes/acountControllers');

app.get('/' , (req,res) => {
    console.log('this is page home')
})
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use('/user',userControlers);
app.use('/acount',acountControllers);
//coneccto databases
require('./utils/db');


app.listen(process.env.PORT,() => {
    console.log(`port ini berjalan pada || http://localhost:${process.env.PORT}`);
})
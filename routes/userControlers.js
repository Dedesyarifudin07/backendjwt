const express = require('express');
const routes = express.Router();
const Siswa = require('../models/siswa');
const verifiedToken = require('./route/verifiedToken');
const bcrypt = require('bcrypt');
const validate = require('../config/validation');

routes.get('/',verifiedToken,async (req,res) => {
    try {
        const siswa = await Siswa.find();
        return res.status(200).json({siswa}).send('data already');
    } catch (error) {
        return res.status(404).send('data failed').json({message:'data gagal ditampilkna'})
    }
})

routes.post('/',async (req,res) => {
    const {name,email,password} = req.body;
    const {error} = validate(req.body);
    if(error){
        return res.status(400).json({
            message:error.message,
            status:res.statusCode
        })
    }

    //cek email
    const userSiswa = await Siswa.findOne({name,email})
    if(userSiswa){
        return res.status(400).json({
            message:'email dan nama sudah ada',
            status:res.statusCode
        })
    }

    const hash = bcrypt.hashSync(password , 10);

    const siswaPost = new Siswa({
        name,
        email,
        password:hash,
    })

    try{
        const siswa = await siswaPost.save();
        return res.json(siswa)
    }catch(eror){
        return res.json({message:eror,statusCode:res.statusCode})
    }
})

routes.put('/:siswaId', async (req,res) => {
   try {
    const siswaUpdate = await Siswa.updateOne({_id:req.params.siswaId},
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
    res.json(siswaUpdate);
   } catch (error) {
    res.json({messsage:error, status:res.statusCode}).send('error')
   }
})

routes.delete('/:siswaId' , async (req,res) => {
    try {
        const siswaDelete = await Siswa.deleteOne({_id:req.params.siswaId})

            return res.json(siswaDelete);
    } catch (error) {
        res.json({messsage:error}).send('error').status(400)
    }
})

module.exports = routes;
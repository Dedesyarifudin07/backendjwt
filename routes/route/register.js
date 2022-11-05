const acount = require('../../models/acount');
const bcrypt = require('bcrypt');
const validate = require('../../config/validation');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    const {password,email ,name} = req.body;

    //validasi menggunakan joi
    const {error} = validate(req.body);
    if(error){
        return res.status(400).json({
            message:error.message,
            statuscode:res.statusCode
        })
    }

    //cek email
    const exist = await acount.findOne({email});
    if(exist){
        return res.status(404).json(
            {message:'email already exist',
            status:res.statusCode
        })
    }

    //hash password
    const hash = bcrypt.hashSync(password, 10);

    //buat account
    const newAcount = new acount(
    {
        name,
        email,
        password:hash,
    })


    try{
       const acount=  await newAcount.save();
        return res.status(200).json(acount).send('succes');
    }catch(error){
        return res.status(404).json(error).send('failed create acount');
    }
}

const login = async(req,res) => {
    const {name,email,password} = req.body;
    const user = await acount.findOne({name,email});
    if(!user){
        return res.status(404).json({
            message:'user not found',
            status:res.statusCode
        })
    }
    //cek password
    const validPw = await bcrypt.compare(password,user.password)
    if(!validPw){
        return res.status(404).json(
        {
            message:'password dont valid',
            status:res.statusCode
        })
    }

    //cek buat token
    const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:'1h'})
     res.header("auth-token",token).json({
        token:token
    })
    
}

module.exports= {register,login};
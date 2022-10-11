const UsData = require('../model/user');
const cryption = require('bcrypt');
const jwt = require('jsonwebtoken');
const validCred = require('../validator/validate');
const secretKey = 'SHA-12-AGHTYAHdbfgah';


const CreateUser = async(req,res)=>{
 const{name,email,phone,password} = req.body;
    try{
        const valid = await validCred.validateAsync(req.body);
        if(valid){
        const existingUser = await UsData.findOne({email:email});
        if(existingUser){
            res.status(400).json({message:"email id already exists"});
        }
        const hashed = await cryption.hash( password, 10);
        const result = await UsData.create({
            name:name,
            email:email,
            phone:phone,
            password:hashed
        })

        const token = await jwt.sign({email: result.email, id:result._id}, secretKey);
        res.render('login')
        console.log('token', token);
     }
    }catch(err){
        res.status(500).send(err);
    }
};

module.exports = {CreateUser};
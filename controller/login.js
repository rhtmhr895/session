const UsData = require('../model/user');
const cryption = require('bcrypt');
const jwt = require('jsonwebtoken');
const validCred = require('../validator/validateUser');
const secretKey = 'SHA-12-AGHTYAHdbfgah';



const LoginUser = async(req,res)=>{
 const{email,password} = req.body;
    
    try{
        const valid = await validCred.validateAsync(req.body);
        if(valid){
        const existingUser = await UsData.findOne({email:email});
        if(!existingUser){
            res.status(400).json({message:"user doesn't exists"});
        }
        const compare = await cryption.compare( password, existingUser.password);
        if(!compare){
            res.status(400).json({message:"password incorrect please enter correct password"});
        }

        const token = await jwt.sign({email: existingUser.email, id:existingUser._id}, secretKey);
        req.session.isAuth = true;
        res.render('index');
        // console.log('login token', token);
        // res.status(200).json({
        //     token: token,
        //     message:"login successful"

        // });
       }
    }catch(err){
        res.status(500).send(err);
    }
};

module.exports = {LoginUser};
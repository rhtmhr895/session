const express = require('express')
const router = express.Router();

const isAuth=(req,res,next)=>{

   if(req.session.isAuth){
     next();
   }else{
     res.render('login');
   }
 
 }



   //=========================================//
  //     IMPORTING API FROM CONTROLLERS      //
 //                                         //
//=========================================// 

const NewUser = require('../controller/regs');
const Login = require('../controller/login');
const Blog = require('../controller/addData');
const addFile = require('../controller/upldFIle');


//============Hitting API ==============//

router.post('/new', NewUser.CreateUser);
router.post('/login',isAuth, Login.LoginUser);
router.post('/blog', Blog.AddContent);
router.post('/image', addFile.addFile);



module.exports = router;

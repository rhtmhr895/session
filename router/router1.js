const express = require('express');

const rout1 = express.Router();

const isAuth=(req,res,next)=>{

    if(req.session.isAuth){
      next();
    }else{
      res.render('login');
    }
  
  };
 

rout1.get('', (req,res)=>{

        data ={
            Logo:'BloggerBurg',
            paragraph:'hello this is the paragraph'
        };

        res.render('home', data)
    });

rout1.get('',isAuth,async(req,res)=>{

        data ={
            Logo:'BloggerBurg',
            paragraph:'hello this is the paragraph',
            user:'user'
        };
   try{
        res.render('index', data)
  
     }catch(e){
    res.send({message:"error occured"})
   }
    });

// rout1.get('/remember',(req,res) => {
//     session=req.session;
//     data ={
//         Logo:'BloggerBurg',
//         users:session.userid,
//         paragraph:'jsafhdkj',
//     };

//     if(session.userid){
        
//         res.render('index', data);
//     }else
//     res.render('index')
// });

rout1.get('/views/login.hbs', (req,res)=>{

    res.render('login')
})

rout1.get('/views/blog.hbs',(req,res)=>{
    res.render('blog')
})



rout1.get('/views/signUp.hbs', (req,res)=>{
    res.render('signUp')
})

module.exports = rout1;
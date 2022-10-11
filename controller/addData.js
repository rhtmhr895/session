const contData = require('../model/content');

const express = require('express');

const AddContent = async(req,res)=>{
    try{
     let data = new contData(req.body);
     const store = await data.save()
     res.status(201).json({
        success:'true',
        data:store
     })

    }catch(err){
        console.log(err);
        
    }
};

module.exports = {AddContent};
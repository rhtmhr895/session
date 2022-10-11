const addFile = async(req,res)=>{
try{
    if(!req.files){
        res.status(400).send('please upload a file first');
    }
    else{
        let add = req.files.add;
        add.mv('./upload/'+ add.name);
        res.send({
            status:"true",
            message: "file uploaded successfully",
            data:{
               name:add.name,
               mimetype:add.mimetype,
               size:add.size
            }
        });

    }
    
}catch(error){
    res.status(500).send(error);
}
};

module.exports ={addFile}
const express = require('express');
const addRoute = require('./router/router');
const engineRout = require('./router/router1');
const upload = require('express-fileupload');
const port = process.env.express||3500;
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Bisleri';
const logs = require('morgan');
var path = require('path');
const session = require('express-session');
const pay = require('razorpay');
const MongoDBSession = require('connect-mongodb-session')(session);
const cors = require('cors');

var conn = express();


const instance = new pay({
    key_id: 'rzp_test_k24NIo0ZrFMwIS',
    key_secret: 'BCFQVa54JicP7o0PjxJo9nKT'
});


mongoose.connect(url).then((res)=>{
    try{
        console.log('connected to database');
    }catch(err){
        console.log(e);
        
    }
})


const store = new MongoDBSession({
    uri:url,
    collection:"mysessions"
  })

conn.use(cors())

conn.use(upload({
    createParentPath: true
}));

conn.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:store
  }));

 




conn.set('view engine', 'hbs');
conn.use(express.static(path.join(__dirname, 'public')));
conn.use(session({secret:'cS8@wE2$5sTy'}))
conn.use(express.json());
conn.use(express.urlencoded({extended:false}));

conn.use(logs('dev'));
conn.use('',engineRout);
conn.use('/api',addRoute);

//=========razor pay===============//

conn.post('/createOrder',(req,res)=>{
    const{amount,currency,receipt,notes} = req.body;
    instance.orders.create({amount,currency,receipt,notes}, function(err, order) {
        if(err){
            console.log(err)
        }
        res.redirect('/')
        console.log('order created', order);
      });
})





conn.listen(port,()=>{
    try{
        console.log('server is listening on port', port);
        

    }catch(e){
        console.log(e);
        
    }
})


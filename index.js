const express= require('express');
const mongoose = require('mongoose');
const MONGOURI = 'mongodb+srv://dbUser:dbUserPassword@cluster0.z4ijc.mongodb.net/hackerpolls?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000
const app=express();

require('./models/candidate');
app.use(express.json());
app.use(require('./apis/candidate'));
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log("Connected to DB");
})

mongoose.connection.on('error',(err)=>{
    console.log(err);
})

process.on('unhandledRejection', (error, promise) => {
    console.log(error);
});

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("App listening at ",PORT);
})

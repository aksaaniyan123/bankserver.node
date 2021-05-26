
const express = require('express');//import statement ....require means import
const dataService=require('./service/data.service');
const app = express();//oru application crete cheyyan express call cheythu
app.use(express.json())


app.get('/',(req,res)=>{// '/' means empty path...request,respone
    res.status(401).send("this is a get method")
});
app.post('/',(req,res)=>{
    res.send("this is a post method")
});
app.post('/register',(req,res)=>{
   const result= dataService.register(req.body.uname,req.body.acno,req.body.pswd);
   console.log (res.send(result.message));
});
app.post('/login',(req,res)=>{
    const result= dataService.login(req.body.acno,req.body.pswd);
    res.status(result.statuscode).json(result)
    //console.log (res.send(result.message));
 });
app.patch('/',(req,res)=>{
    res.send("this is a patch method")
});
app.delete('/',(req,res)=>{
    res.send("this is a delete method")
});
app.listen(3000,()=>{//call back function//port set cheythu
    console.log("server started at port 3000");
})







const express = require('express');//import statement
const app = express();
app.get('/',(req,res)=>{
    res.send("this is a get method")
});
app.post('/',(req,res)=>{
    res.send("this is a post method")
});
app.patch('/',(req,res)=>{
    res.send("this is a patch method")
});
app.delete('/',(req,res)=>{
    res.send("this is a delete method")
});
app.listen(3000,()=>{//call back function
    console.log("server started at port 3000");
})






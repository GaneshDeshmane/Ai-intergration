const express = require("express");
const userRouter = require('./router/user')
const app = express();
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router  = require('./Routes/router')
require('./DB/connection')

// create express application
const blogserver = express()


blogserver.use(cors())
blogserver.use(express.json())
blogserver.use(router)

const PORT = 4000 || process.env.PORT

blogserver.listen(PORT,()=>{
    console.log(`Blog Server started at port: ${PORT} and waiting for client request!!!`);
})
// 
blogserver.get('/',(req,res)=>{
    res.send(`<h1>Blog server started and waiting for client request!!!</h1>`)
})

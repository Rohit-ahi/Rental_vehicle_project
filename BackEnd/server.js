

const express = require('express')
const path = require('path')
const fileupload = require('express-fileupload')
const cors = require('cors')

const basicrouter = require('./routers/basicrouter')
const authrouter = require('./routers/authrouter')

const server = express()  

server.use(cors())

 server.use(express.static(path.join(__dirname , 'uploads')))

// server.use('/vm', express.static(path.join(__dirname, 'uploads/vm')));


server.use(fileupload())
server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.use('/rental', basicrouter)
server.use('/auth',authrouter)


server.use((req,res)=>{
       res.json('Wrong URL**** ')
})

const port = 8080
server.listen(port,()=>{
     console.log("server is running" , port)  
})



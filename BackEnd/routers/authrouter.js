

const router = require("express").Router()
const ApiResponse = require('./apiresponse')
const {tokenvarify} = require('../config/jwtconfig')

const adminrouter = require('./adminrouter')
const sprouter = require('./sprouter')
const customerrouter = require('./customerrouter')

          //  custom MiddleWare

    router.use((req,res,next)=>{
         
         const tokenheaders = req.headers.authorization

         if(tokenheaders==undefined) {
               res.json(new ApiResponse(false,'no token found'))

         }else {
                  const tok = tokenheaders.split(' ')
                  tok.splice(0,1)
                  const token = tok.join(',')

                // // console.log("ooooo:",token) 

                tokenvarify(token,(err,tokendata)=>{

                        if(err) {
                              res.json(new ApiResponse(false,"Invalid or Expire Token"))
                        }else{
                                const id = tokendata.userid
                                const role = tokendata.role
                                req.userinfo = {id,role}
                                next()
                                
                        }
                })

         }    
    }) 

   router.use('/admin',adminrouter)
   router.use('/sp',sprouter)
   router.use('/customer',customerrouter)

module.exports = router
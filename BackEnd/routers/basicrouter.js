

const router = require('express').Router()
const {User ,ServiceProvider ,sequelize} = require('../models')
const ApiResponse = require('./apiresponse')
const {generatetoken} = require('../config/jwtconfig')


router.post('/sp_reg', async(req,res)=>{
            
           const t = await sequelize.transaction()

           const{password} = req.body
           if (password.length < 6 || password.length > 10) {
              return res.status(400).json(new ApiResponse(false, "Password must be between 6 and 10 characters long"));
             }
          

      try {
             const reqdata = req.body
             const{name,phone ,email,password} = reqdata
            
            
             const userdata = {name,phone,email,password,role:"service_provider",status:true}
             const user = await User.create(userdata,{transaction : t})

             const{company_name,address,contact,reg_number,contact_person} = reqdata
             const spdata = {company_name,address,contact,reg_number,contact_person ,user:user.id}
             const sp =  await ServiceProvider.create(spdata , {transaction : t})
       
             await t.commit()
             res.json(new ApiResponse(true,"service_provider Ragistration successfull"))

      } catch (error) {
              await t.rollback()
             // console.log("sp Ragistration err :", error)
             res.json(new ApiResponse(false,"service_provider Ragistration failled"))
      }
})

  router.post('/cust_reg',async(req,res)=>{
          
       const{password} = req.body
       if (password.length < 6 || password.length > 10) {
              return res.status(400).json(new ApiResponse(false, "Password must be between 6 and 10 characters long"));
          }

       try {
              var reqdata = {...req.body ,role:'customer',status:true}
              const user = await User.create(reqdata)
              res.json(new ApiResponse(true,'Customer Registration Successfull'))
              
       } catch (error) {
            // console.log('cust_reg error :',error)
            res.json(new ApiResponse(false,'Customer Registration Failled'))  
       }
  })       


router.post('/login' , async (req,res)=>{
        
       const data  = req.body;
       // console.log('data',data)

       const {email,password}  = req.body
       if (password.length < 6 || password.length > 10) {
              return res.status(400).json(new ApiResponse(false, "Password must be between 6 and 10 characters long"));
          }


       const user = await User.findOne({where:{email,password}})

       if(user==null) {
                res.status(401).json(new ApiResponse(false , "Invalid User...."))        
       }else {
                const token = generatetoken(user.id,user.role)
                const role = user.role;
                res.status(200).json(new ApiResponse(true ,"Correct id and Password" ,token,role))
       }
} )


                                          //   Vehicle list   
router.get('/vehiclelist',async(req,res)=>{
             
       try {
            const data = await Vehicles.findAll({
            include : ['user','veh_master'],
            attributes : {
                exclude : ['provider','master']
            }
        })
        res.json(data)  

       } catch (error) {
             console.error('error fethcing vehicles',error)
             res.json(new ApiResponse(false,'internal Server error'))
       }
 })


// vm list
// vehicle list


module.exports = router



const ApiResponse = require('./apiresponse');
const router = require('express').Router()
const{Vehicles} = require('../models');
const {VehicleRequest}=require('../models')

router.use((req,res,next)=>{
        const role = req.userinfo.role;
        if(role=='customer')
                next()
        else {
                res.json(new ApiResponse(false,'AnAuthaurized Access'))
        }
})

 router.get('/vm_list',async(req,res)=>{

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

 router.get('/vm_list/:id',async(req,res)=>{

        const carid = req.params.id

       try {
               const car = await Vehicles.findOne({where:{id:carid},
                include : ['user','veh_master'],
                attributes : {
                    exclude : ['provider','master']
                }
               })
               if(car==null) {
             res.json(ApiResponse(false,"Car Not find"))
               }

               res.json(car)

       } catch (error) {
           // console.log('Catch error :' ,error)
       }
})


router.post('/vehicle-booking',async (req,res)=> {
            // console.log('jfddddddddkjdfdf')
        try{
                customer = req.userinfo.id
                // console.log('custtomer id :',customer)

              const {...data} = req.body;
              // console.log('reqdata',req.body)

              const bookingdata = {
                   customer ,
                   ...data

              }

              // console.log('bookingdata :',bookingdata)
              
              const booking = await VehicleRequest.create({...bookingdata ,status:false}) 
              // console.log('booking :',booking)
              res.status(201).json(new ApiResponse(true,'Booking successful',booking))
              
                
        }catch(error) {
              // console.log('error in booking vehicle',error )
              res.status(501).json(new ApiResponse(false,'Booking failed '))
        }
        
})


router.get('/booking-history',async(req,res)=>{

        try {
                const data = await VehicleRequest.findAll( {
                        include:["user","vm"],
                        attributes : {
                          exclude:['customer','vamster']
                        }
                    })
                res.json(data) 

        } catch (error) {
             // console.log('error :',error)    
        }
})


module.exports = router
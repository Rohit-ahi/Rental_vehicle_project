
const ApiResponse = require('./apiresponse')
const router = require('express').Router()
const {ServiceProvider, sequelize} = require('../models')
const {Vehicles} = require('../models')
const {VehicleMaster} = require('../models')
const {VehicleRequest} = require('../models')


router.use((request,response,next)=>
        {
            const role = request.userinfo.role;
            if(role=='service_provider')
                next()
            else
                response.json(new ApiResponse(false,"UnAuthorized Access !"))
        })

 router.get('/splist',async(req,res)=>{

           try {
            
            const data = await ServiceProvider.findAll({
                include : "userrec",
                attributes : {
                    exclude : ['user']
                }
        
            })
            res.json(data)   

           } catch (error) {
                   res.json(new ApiResponse(false,'Server error'))
           }
})

 router.post('/vehiclesave',async(req,res)=>{
             
       try {
               const provider = req.userinfo.id;
               // console.log('provider',provider)
               const { master, ...vehicleData } = req.body;
               // console.log('send data :',req.body)
               const newvehicle = {
                   ...vehicleData,
                   provider, 
                   master   
            };
            // console.log('newvehicle :', newvehicle)
            await Vehicles.create(newvehicle)
            res.json(new ApiResponse(true,'Data Save successfully'))

       } catch (error) {
             res.json(new ApiResponse(false,'Vehicle Not Add'))
             // console.log('error :',error)
       }
})

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

 
 router.delete('/vehicledel/:vid/:vmid', async(req,res)=>{

           const { vid, vmid } = req.params;     
   
           const t = await sequelize.transaction() 

           const bookvehicle = await VehicleRequest.findOne({where:{vmaster:vmid}})
           if(bookvehicle) {
               return res.json(new ApiResponse(false,"Booked Vehicle can't deleted"))
           }
         try {
    
               const vehicleDeleteResult = await Vehicles.destroy({ where: { id: vid }} , { transaction: t } );
    
               if (!vehicleDeleteResult) {
                           throw new Error('Vehicle not found or could not be deleted');
                      }
    
                 
                const vehicleMasterDeleteResult = await VehicleMaster.destroy({where: { id: vmid }}, { transaction: t });
    
                if (!vehicleMasterDeleteResult) {
                         throw new Error('VehicleMaster not found or could not be deleted');
                     }
          
    
                     await t.commit();
                     return res.status(200).json({ status: true, msg: 'Vehicle and VehicleMaster deleted successfully' });
    

         } catch (error) {
          
            await t.rollback();
            return res.status(500).json({ status: false, msg: error.message });
         }








             
//     const vid = req.params.vid

//      try {
//            const vehicle = await Vehicles.findOne({where: {id:vid}})
//            if(vehicle==null) {
//                 res.json(new ApiResponse(false,'Vehicle Not Found'))
//            }else {
//                 await vehicle.destroy()
//                 res.json(new ApiResponse(true,'Vehicle Successfully Deleted'))
//         }
//      } catch (error) {
//            res.json(new ApiResponse(false,'Server error'))
//      }

 })









 router.get('/list_vm',async(req,res)=>{

    const list = await VehicleMaster.findAll()
    res.json(list)
//     res.json(new ApiResponse(true,""))
    
})

module.exports = router


// vehicle save
// vehicle list - khud ki
// vehi delete  

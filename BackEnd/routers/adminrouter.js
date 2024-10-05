
router = require('express').Router()

const ApiResponse = require('./apiresponse')
const path = require('path')
const {v4:uuidv4} = require('uuid')
const {VehicleMaster, sequelize} = require('../models')
const { response } = require('express');
const {Vehicles} = require('../models');
const {User, ServiceProvider} = require('../models')
const{ VehicleRequest} = require('../models')




router.use((req,res,next)=>{

         const role = req.userinfo.role
         // console.log("role :",role)

         if(role == "admin")
              next()
         else {
                  res.json(new ApiResponse(false,"UnAuthaurized Access"))
         }
})

                                        // user_list
router.get('/userlist', async(req,res)=>{
          
       const data = await User.findAll()
       res.json(data)
})


                                        // sp_list
router.get('/splist',async(req,res)=>{
          // console.log('*******************')
      try {

        // console.log('hey :-----------------')
       const data = await ServiceProvider.findAll({
           include : "userrec",
           attributes : {
               exclude : ['user']
           }
   
       })
       res.json(data)   

      } catch (error) {
              res.json(new ApiResponse(false,'Server error'))
              console.error("error :",error)
      }
})



      // model,type,image,capacity_seats,capacity_tons
router.post('/save_vm',async(req,res)=>{
         
      const reqdata = req.body  // text-field data
        // console.log('reqdata :',reqdata)

      try {
             const file = req.files.image   // file-field ,image.name ,.data,.mv 
             // const file.name = car.jpg

             var filename = uuidv4() + path.extname(file.name) // `65h6rj8rjjr.jpg`
             var filepath = path.join('uploads/vm',filename) // up/vm/`65h6rj8rjjr.jpg`
               
             var replacedPath = filepath.replace(/\\/g, '/');

             file.mv(replacedPath) // save-  up/vm/`65h6rj8rjjr.jpg`    
            
             const finaldata = {...reqdata , image :"http://localhost:8080/"+replacedPath.replace('uploads/', '')}
             await VehicleMaster.create(finaldata)
             
             res.json(new ApiResponse(true,'Vehicle master saved'))

      } catch (error) {
             res.json(new ApiResponse(false,"vehicle master failled"))
      }
})

    router.get('/list_vm',async(req,res)=>{

           const list = await VehicleMaster.findAll()
           res.json(list)
       //     res.json(new ApiResponse(true,""))
           
    })

    
//    router.delete('/del_vm/:vmid',async(req,res)=>{
//               const vmid = req.params.vmid
//               // console.log("vmid*** :", vmid)
//              try {
//                    const vmmaster = await VehicleMaster.findOne({where:{id:vmid}})
//                    if(vmmaster==null) {
//                               res.json(new ApiResponse(false,'VehicleMaster Not found'))
//                    } else {

//                         await vmmaster.destroy()
//                         res.json(true,'VehicleMaster successfully Saved')
//                    }

//              } catch (error) {
//                   res.json(new ApiResponse(false,'Server error-------',error))
//              }

//    })


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


 router.delete('/del_vm/:vmid', async(req,res)=>{
             
      const {vmid } = req.params;     
    //   const vmaster = await VehicleMaster.findOne({where: {id:vmid}})
          
      // console.log("vmid*** :" , vmid)
      const t = await sequelize.transaction() 

    

     try {
                  const vehicles = await Vehicles.findOne({ where: { master: vmid } });
                  // console.log('fjf**--- :', vehicles)
        const bookedvm = await VehicleRequest.findOne({where:{vmaster:vmid}})
        if(bookedvm){
           return res.json(new ApiResponse(false,"Booked_Vehicle can't deleted"))

        }else  {

        if(vehicles) {

                const vehicleDeleteResult = await Vehicles.destroy({ where: { master: vmid }} , { transaction: t } );
           
                if (!vehicleDeleteResult) {
                       //throw new Error('Vehicle not found or could not be deleted');
                       // console.log('Vehicle not found or could not be deleted')
                    }
         }
             
            const vehicleMasterDeleteResult = await VehicleMaster.destroy({where: { id: vmid }}, { transaction: t });

            if (!vehicleMasterDeleteResult) {
                     //throw new Error('VehicleMaster not found or could not be deleted');
                     // console.log('VehicleMaster not found or could not be deleted')
                 }

        }

                 await t.commit();
                 return res.status(200).json({ status: true, msg: 'Vehicle and VehicleMaster deleted successfully' });



      //      const vehicle = await Vehicles.findOne({where: {id:vehicleid}})
      //      if(vehicle==null) {
      //           res.json(new ApiResponse(false,'Vehicle Not Found'))
      //      }else {
      //           await vehicle.destroy()
      //           res.json(new ApiResponse(true,'All related vehicles deleted successfully'))
      //   }



     } catch (error) {
      //      res.json(new ApiResponse(false,'Server error****'))
        await t.rollback();
        return res.status(500).json({ status: false, msg: error.message });
     }

 })


 router.delete('/userdel/:uid', async(req,res)=>{

          

          const {uid} = req.params
          const user = await User.findOne({where: {id:uid}})
          
          // console.log("uid*** :" , uid)
        
        if (!user) {
            return res.status(404).json({ status: false, msg: 'User not found' });
        }

        if(user.role!=='service_provider') {
           
                     if(user.role=='admin') {
                          res.json(new ApiResponse(false,"Admin can't be deleted"))
                     }else {

                          const bookuser = await VehicleRequest.findOne({where:{customer:uid}})
                          // console.log("bookuser :",bookuser)
                          if(bookuser) {
                              res.json(new ApiResponse(false,"Booked User can't be deleted"))
                          }else {
                            await user.destroy()
                            res.json(new ApiResponse(true,'Customer Deleted Successfully'))
                          }
                          
                    }
                 
        }else {

          const t = await sequelize.transaction() 

      try {
                
                const vehicles = await Vehicles.findOne({ where: { provider: uid } });
                // console.log('fjf**--- :', vehicles)

                if(vehicles) {

                       // console.log('hjhjdfjj')
                    const VDeleteResult = await Vehicles.destroy({ where: { provider:uid  }} , { transaction: t } );

                    if (!VDeleteResult) {
                              throw new Error('vehicle not found or could not be deleted');
                           }

                }

            const spDeleteResult = await ServiceProvider.destroy({ where: { user:uid  }} , { transaction: t } );

              if (!spDeleteResult) {
                              throw new Error('ServiceProvider not found or could not be deleted');
                              
                }
                

             const UserDeleteResult = await User.destroy({where: { id: uid }}, { transaction: t });
 
             if (!UserDeleteResult) {
                      throw new Error('User not found or could not be deleted');
                  }
       
 
                  await t.commit();
                  return res.status(200).json({ status: true, msg: 'User and  Service_Provider Deleted successfully' });

      } catch (error) {
             console.error("Error in Transaction: ", error);
            await t.rollback();
            return res.status(500).json({ status: false, msg: error.message });
          }

    }

      //     const user = await User.findOne({where: {id:uid}})
      //          if(user==null) {
      //               res.json(new ApiResponse(false,'Vehicle Not Found'))
      //          }else {
      //               await user.destroy()
      //               res.json(new ApiResponse(true,'All related vehicles deleted successfully'))
      //       }
             
})




                                                       // Vehicles Deleted
 router.delete('/vehicledel/:vid', async(req,res)=>{

             
    const vid = req.params.vid

     try {
           const vehicle = await Vehicles.findOne({where: {id:vid}})
           if(vehicle==null) {
                res.json(new ApiResponse(false,'Vehicle Not Found'))
           }else {
                await vehicle.destroy()
                res.json(new ApiResponse(true,'Vehicle Successfully Deleted'))
        }
     } catch (error) {
           res.json(new ApiResponse(false,'Server error'))
     }










//     const { vid, vmid } = req.params;     

//     const t = await sequelize.transaction() 

//   try {

//         const vehicleDeleteResult = await Vehicles.destroy({ where: { id: vid }} , { transaction: t } );

//         if (!vehicleDeleteResult) {
//                     throw new Error('Vehicle not found or could not be deleted');
//                }

          
//          const vehicleMasterDeleteResult = await VehicleMaster.destroy({where: { id: vmid }}, { transaction: t });

//          if (!vehicleMasterDeleteResult) {
//                   throw new Error('VehicleMaster not found or could not be deleted');
//               }
   

//               await t.commit();
//               return res.status(200).json({ status: true, msg: 'Vehicle and VehicleMaster deleted successfully' });


//   } catch (error) {
   
//      await t.rollback();
//      return res.status(500).json({ status: false, msg: error.message });
//   }


})





// Update VehicleMaster

router.put('/update_vm/:id',async(req,res)=>{

//            const vmid = req.params.id
//            const reqdata = req.body
//            // console.log('reqdata :',reqdata)

//            const vmaster = await VehicleMaster.findOne({where:{id:vmid}})
           
//         try {
//                 let imagepath = null;

//                 if(req.files && req.files.image) {
//                       const file = req.files.image
//                       const filename = uuidv4() + path.extname(file.name)
//                       const filepath = path.join('/uploads/vm',filename) 
//                        const replacedPath = filepath.replace(/\\/g,'/')

//                       // console.log('replacepath :',replacedPath)
                      
//                        file.mv(replacedPath)

//                        imagepath = 'http://localhost:8080' + replacedPath.replace('uploads/','')

//                        // console.log('imagepath :',imagepath)

//                }

//                const finaldata = {
//                        ...reqdata ,
//                        ...(imagepath && {image : imagepath})
//                }

//                // console.log('finaldata ** :',finaldata)
//              const [updated] =  await vmaster.update(finaldata)

//                 // console.log('updated *****',updated)

//                 if(updated) {
            
//                     res.json(new ApiResponse(true,'VehicleMaster Updated Successfully'))
//                 }else {

//                      res.json(new ApiResponse(false,' Failed VehicleMaster Updated '))
//                 }

//         } catch (error) {
//                  // console.log('update_vm catch error :',error)
//                 res.json(new ApiResponse(false,' Server Error ',error))
//            }
// })



const vmid = req.params.id;
const reqdata = req.body;
// console.log('reqdata:', reqdata);

try {
    // Find the VehicleMaster entry by ID
    const vmaster = await VehicleMaster.findOne({ where: { id: vmid } });
    
    
    // Check if the vehicle master exists
    if (!vmaster) {
        return res.json(new ApiResponse(false, 'VehicleMaster not found'));
    }
    

    let imagepath = null;

    // Handle file upload if an image file is present
    if (req.files && req.files.image) {
        const file = req.files.image;

        // Generate unique filename
        const filename = uuidv4() + path.extname(file.name);

        // Generate absolute path to save the file in your server directory
        const filepath = path.join( __dirname ,'../uploads/vm', filename);
        const replacedPath = filepath.replace(/\\/g, '/');  // Handling slashes for Windows

        // console.log('replacepath:', replacedPath);

        // Move the file to the uploads directory
        file.mv(replacedPath, (err) => {
            if (err) {
                console.error('Error moving file:', err);
                return res.json(new ApiResponse(false, 'Error uploading image', err));
            }
        });

        // Create the image path for frontend use
        imagepath = `http://localhost:8080/vm/${filename}`; // Assuming you serve the uploads folder as static
        // console.log('imagepath:', imagepath);
    }

    // Prepare the final data for update, conditionally adding the image path
    const finaldata = {
        ...reqdata,
        ...(imagepath && { image: imagepath })
    };

    // console.log('finaldata **:', finaldata);

    // Update the VehicleMaster record
    const [updated] = await VehicleMaster.update(finaldata, { where: { id: vmid } });


    // console.log('updated *****', updated);

    if (updated) {
        return res.json(new ApiResponse(true, 'VehicleMaster Updated Successfully',finaldata));
    } else {
        return res.json(new ApiResponse(false, 'Failed to Update VehicleMaster'));
    }
} catch (error) {
    // console.log('update_vm catch error:', error);
    return res.json(new ApiResponse(false, 'Server Error', error));
}
});
           
    //delete
    // list user
    // user del , adit


module.exports = router


import React from 'react'
import '../tablev.css'
// import '../Vmasterlist.css'
import {useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Vmasterupdate from './Vmasterupdate'

export default function Vmasterlist() {

    const tok = useSelector(state=>state.login.token)
    const[vmaster,setvmaster] = useState([])

    const [selectevm, setSelectevm] = useState(null); 
    const [showPopup, setShowPopup] = useState(false);

    // console.log('selectvm :',selectevm)    // vm data
    // console.log('showpopup :', showPopup)  // true

   console.log('vmaster ****** :',vmaster)


   useEffect(() => {
     
         try {
                 fetch('http://localhost:8080/auth/admin/list_vm', {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${tok}`
                 },
             }).then(res=>res.json()).then(data=>  {
                  console.log('API Response:', data);
                  setvmaster(data)
             } )
 
         } catch (error) {
             console.error("Error fetching vehicle list:", error);
            //  setmsg('An error occurred, please try again later.');
         }

   }, [tok]);


    const handledelete = (vmid)=> {

                // console.log("****vmid" , vmid )  
        try {
            const result = window.confirm('Are you sure you want to delete this item?');
            if(result) {
            
                fetch(`http://localhost:8080/auth/admin/del_vm/${vmid}`,{
                    method:'DELETE',
                    headers: {
                        "Content-Type" : "application/json",
                        'Authorization' : `Bearer ${tok}`
                    }
               }).then(res=>res.json()).then(data=> {
                
                       console.log("vehiclemaster data** :",data)

                       if(data.status) {
                        // setvehicle(vehicle.filter(ob=>ob.id!== vehicleid))
                       
                            setvmaster(vmaster.filter(ob=>ob.id!==vmid))
                        
                       
                     }else{
                        toast.error(data.msg, {
                            position: 'top-center',
                            autoClose: 8000, // Auto-close after 3 seconds
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        
                     }
               })

            }
             } catch (error) {
                console.error("Error deleting vehicle:", error)
             }
      }


    const handleEditclick = (vm)=>{
       // console.log('VM--- :', vm)
        setSelectevm(vm)
        setShowPopup(true)
    }

        const  handleUpdate = (id,updateData)=> {
                 
           // console.log('id :',id)
           //console.log('updatedata :',updateData)

           fetch(`http://localhost:8080/auth/admin/update_vm/${id}`, {
              method :'PUT',
              headers : {
                   'Authorization' : `Bearer ${tok}`
              },
              body : updateData
          })

          .then(res=>res.json()).then(data=> {
                
                 console.log('update response data :',data)
                 if(data.status) {

                    let updatedVehicle = data.data
                    let img = updatedVehicle.image
                    
                        //   if(updatedVehicle.image === 'undefined') {
                        //     let {model,capacity_seats ,capacity_tons , type} = updatedVehicle
                        //     var updatedVehicledata = { model, capacity_seats, capacity_tons, type };
                    
                        //   }

                        if(img !== 'undefined') {
                              var updatedata = {...updatedVehicle}
                         }else {

                            let {model,capacity_seats ,capacity_tons , type} = updatedVehicle
                              updatedata = { model, capacity_seats, capacity_tons, type };
                         }

                    console.log('updatevehicledata :',updatedata) 
                    console.log('updatevehicle :',updatedVehicle)

                       setvmaster(vmaster.map(vm=>vm.id===id ? {...vm , ...updatedata  } : vm))
                       setShowPopup(false)
                       //setmsg(resdata.msg)
                     toast.success('Vehicle_Update Successfully', {
                        position: 'top-center',
                        autoClose: 8000, // Auto-close after 3 seconds
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                 }else {
                      console.log('Vm Update failed',data.msg)
                 }
          })
   
        }
      // const updatedVehicle = {};
                    // updateData.forEach((value, key) => {

                    //     if (value instanceof File) {
                    //         updatedVehicle[key] = value.name
                    //       } else {
                    //         updatedVehicle[key] = value;
                    //       }
                      
                    // });
  return (
     <>
                  <Navbar/>
                  <div style={{marginLeft:'10px',marginTop:'10px' , marginBottom:'8px'}}>
                      <Link to="/Vehiclemaster" style={{fontFamily:'sans-serif',fontSize:'15px',letterSpacing:'1px',fontWeight:'bold'}}> <button className='btn btn-info'> Add </button> </Link>
                  </div>
                 
                     <table border="1" cellPadding="10" cellSpacing="0" className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Image</th>
                        <th>seats</th>
                        <th>tons</th>
                         <th>Op</th> 
                    </tr>
                </thead>
                <tbody>
                    {vmaster.map((vm, index) =>{
                         
                        //  const veh = vehicle.find(v => v.veh_master.id === vm.id);
                        //  const uid = veh ? veh.user.id : null;
                        //  const vehicleid = veh ? veh.id : null;
                         console.log('VM*** :',vm)
                         
                   return  (

                        <tr key={index}>
                            <td>{vm.id}</td>
                            <td>{vm.model}</td>
                            <td>{vm.type}</td>
                            
                            <td>
                                <img src={vm.image} alt={vm.model} width="130" className='img2' />
                            </td>
                            <td>{vm.capacity_seats}</td>
                            <td>{vm.capacity_tons}</td>
                             <td>
                                      <div style={{display:'flex', gap:'5px'}}>
                                            
                                            <b onClick={()=>handledelete(vm.id)} style={{cursor:'pointer'}}> <FontAwesomeIcon icon={faTrash } style={{color: "#e40707",fontSize:'22px'}} />  </b>
                                            <b onClick={()=>handleEditclick(vm)} style={{ cursor: 'pointer' }}>   <img src="./edit_icon.png" alt="" width={20} height={18}/>  </b>
                                      </div>
                            </td> 

                        </tr>
                    )
                    
                    })}
                </tbody>

                
            </table> 

 
            {showPopup && selectevm && (
                <Vmasterupdate
                    vm={selectevm}
                    onClose={() => setShowPopup(false)}
                    onUpdate={handleUpdate}
                />
            )}  
     <ToastContainer />  
     </>
  )
}



// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// export default function Vmasterlist() {
//     const tok = useSelector(state => state.login.token);
//     const [vmaster, setVmaster] = useState([]);
//     const [editId, setEditId] = useState(null); // To track which row is in edit mode
//     const [formData, setFormData] = useState({
//         model: '',
//         type: '',
//         capacity_seats: '',
//         capacity_tons: '',
//         image: null
//     });

//     useEffect(() => {
//         fetch('http://localhost:8080/auth/admin/list_vm', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${tok}`
//             }
//         })
//         .then(res => res.json())
//         .then(data => {
//             setVmaster(data);
//         });
//     }, [tok]);

//     const handleEditClick = (vehicle) => {
//         setEditId(vehicle.id); // Set the edit row ID
//         setFormData({
//             model: vehicle.model,
//             type: vehicle.type,
//             capacity_seats: vehicle.capacity_seats,
//             capacity_tons: vehicle.capacity_tons,
//             image: null // For new file upload
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleFileChange = (e) => {
//         setFormData({
//             ...formData,
//             image: e.target.files[0]
//         });
//     };

//     const handleUpdate = (vmid) => {
//         const updatedData = new FormData();
//         updatedData.append('model', formData.model);
//         updatedData.append('type', formData.type);
//         updatedData.append('capacity_seats', formData.capacity_seats);
//         updatedData.append('capacity_tons', formData.capacity_tons);
//         if (formData.image) {
//             updatedData.append('image', formData.image);
//         }

//         fetch(`http://localhost:8080/auth/admin/update_vm/${vmid}`, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': `Bearer ${tok}` // No Content-Type due to FormData
//             },
//             body: updatedData
//         })
//         .then(res => res.json())
//         .then(data => {
//             if (data.status) {
//                 setVmaster(vmaster.map(vm => vm.id === vmid ? { ...vm, ...formData } : vm));
//                 setEditId(null); // Exit edit mode on success
//             } else {
//                 console.error('Failed to update:', data.msg);
//             }
//         });
//     };

//     return (
//         <div>
//             <table border="1" cellPadding="10" cellSpacing="0">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Model</th>
//                         <th>Type</th>
//                         <th>Seats</th>
//                         <th>Tons</th>
//                         <th>Image</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {vmaster.map(vm => (
//                         <tr key={vm.id}>
//                             {editId === vm.id ? (
//                                 <>
//                                     <td>{vm.id}</td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name="model"
//                                             value={formData.model}
//                                             onChange={handleInputChange}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name="type"
//                                             value={formData.type}
//                                             onChange={handleInputChange}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="number"
//                                             name="capacity_seats"
//                                             value={formData.capacity_seats}
//                                             onChange={handleInputChange}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="number"
//                                             name="capacity_tons"
//                                             value={formData.capacity_tons}
//                                             onChange={handleInputChange}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input type="file" name="image" onChange={handleFileChange} />
//                                     </td>
//                                     <td>
//                                         <button onClick={() => handleUpdate(vm.id)}>Save</button>
//                                         <button onClick={() => setEditId(null)}>Cancel</button>
//                                     </td>
//                                 </>

//                             ) : (
//                                 <>
//                                     <td>{vm.id}</td>
//                                     <td>{vm.model}</td>
//                                     <td>{vm.type}</td>
//                                     
//                                     <td>
//                                         <button onClick={() => handleEditClick(vm)}>Edit</button>
//                                     </td>
//                                 </>
//                             )}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function Vehiclelist() {
      
       const tok = useSelector(state=>state.login.token)

       const[vehicle,setvehicle] = useState([])
       const[vmaster,setvmaster] = useState([])
       //const[msg,setmsg] = useState()

       console.log('vehicle :',vehicle)
      // console.log('msg :',msg)

       useEffect(() => {
        
            try {
                    fetch('http://localhost:8080/auth/sp/vehiclelist', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tok}`
                    },
                }).then(res=>res.json()).then(data=> setvehicle(data) )
    
            } catch (error) {
                console.error("Error fetching vehicle list:", error);
               // setmsg('An error occurred, please try again later.');
            }


            try {
                fetch('http://localhost:8080/auth/sp/list_vm', {
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



        
    }, [tok]); // Dependency array
    
      const handleclick = (vid,vmid)=> {
              
             try {
                      fetch(`http://localhost:8080/auth/sp/vehicledel/${vid}/${vmid}` ,{
                          method:'DELETE',
                          headers : {
                                  "Content-Type" : "application/json",
                                  'Authorization':  `Bearer ${tok}` 
                          }
                      }).then(res=>res.json()).then(data=> {
                            if(data.status) {
                                setvehicle(vehicle.filter(ob=>ob.id !== vid))
                               // setvmaster(vmaster.filter(ob=>ob.id!==vmid))
                            }else {
                            //    const a = setmsg(data.msg)
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

             } catch (error) {
                  console.error("Error deleting vehicle:", error)
             }
             
      }

  return (
    <>
                  <Navbar/>
                  <div style={{marginLeft:'30px',marginTop:'10px'}}>
                      <Link to="/Vehicles" style={{fontFamily:'sans-serif',fontSize:'15px',letterSpacing:'1px',fontWeight:'bold'}}> <button className='btn btn-info'>Add</button></Link>
            </div> 
                {/* <h2>Vehicle List</h2> */}
            <table border="1" cellPadding="10" cellSpacing="0" className='table mt-3' >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Registration Number</th>
                        <th>PUC Status</th>
                        <th>Insurance</th>
                        <th>Fuel Type</th>
                        <th>Price per Km</th>
                        <th>AC Charges</th>
                        {/* <th>User Name</th> */}
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicle.map((vehicle, index) => {

                      const veh = vmaster.find(v => v.id === vehicle.veh_master.id);
                      const vmid = veh ? veh.id : null;
                    
                    return(
                        <tr key={index}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.reg_number}</td>
                            <td>{vehicle.ispuc ? "Yes" : "No"}</td>
                            <td>{vehicle.isinsurance ? "Yes" : "No"}</td>
                            <td>{vehicle.fuel_type}</td>
                            <td>{vehicle.price_km}</td>
                            <td>{vehicle.ac_charges}</td>
                            {/* <td>{vehicle.user ? vehicle.user.name : "N/A"}</td> */}
                            <td>{vehicle.veh_master.model}</td>
                            <td>{vehicle.veh_master.type}</td>
                            <td>
                                <img src={vehicle.veh_master.image} alt={vehicle.veh_master.model} width="100" className='img2' />
                            </td>
                            <td>
                                      <b onClick={()=>handleclick(vehicle.id,vmid)} style={{cursor:'pointer'}}> <FontAwesomeIcon icon={faTrash } style={{color: "#e40707",fontSize:'21px'}} />  </b>
                            </td>
                        </tr>
                       )
                    
                    })}

                </tbody>
                 
            </table>

            <ToastContainer />  
             
    </>
  )
}

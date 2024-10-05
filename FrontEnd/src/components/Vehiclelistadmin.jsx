


import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../tablev.css'
// import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar'

export default function Vehiclelistadmin() {
      
       const tok = useSelector(state=>state.login.token)

       const[vehicle,setvehicle] = useState([])
       const[msg,setmsg] = useState()

       console.log('vehicle :',vehicle)
       console.log('msg :',msg)

       useEffect(() => {
        
            try {
                    fetch('http://localhost:8080/auth/admin/vehiclelist', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tok}`
                    },
                }).then(res=>res.json()).then(data=> setvehicle(data) )
    
            } catch (error) {
                console.error("Error fetching vehicle list:", error);
                setmsg('An error occurred, please try again later.');
            }
        
    }, [tok]); // Dependency array
    
      const handleclick = (vid)=> {
              
             try {
                      fetch(`http://localhost:8080/auth/admin/vehicledel/${vid}` ,{
                          method:'DELETE',
                          headers : {
                                  "Content-Type" : "application/json",
                                  'Authorization':  `Bearer ${tok}` 
                          }
                      }).then(res=>res.json()).then(data=> {
                            if(data.status) {
                                setvehicle(vehicle.filter(ob=>ob.id !== vid))
                            }else {
                               const a = setmsg(data.msg)
                               console.log(a)

                            }
                      })

             } catch (error) {
                  console.error("Error deleting vehicle:", error)
             }
             
      }

  return (
    <>
                {/* <h2>Vehicle List</h2> */}
            <Navbar/>
            <table border="1" cellPadding="10" cellSpacing="0" className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Registration Number</th>
                        <th>PUC Status</th>
                        <th>Insurance</th>
                        <th>Fuel Type</th>
                        <th>Price per Km</th>
                        <th>AC Charges</th>
                        <th>User Name</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicle.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.reg_number}</td>
                            <td>{vehicle.ispuc ? "Yes" : "No"}</td>
                            <td>{vehicle.isinsurance ? "Yes" : "No"}</td>
                            <td>{vehicle.fuel_type}</td>
                            <td>{vehicle.price_km}</td>
                            <td>{vehicle.ac_charges}</td>
                            <td>{vehicle.user ? vehicle.user.name : "N/A"}</td>
                            <td>{vehicle.veh_master.model}</td>
                            <td>{vehicle.veh_master.type}</td>
                            <td>
                                <img src={vehicle.veh_master.image} alt={vehicle.veh_master.model} width="100" className='img2' />
                            </td>
                            <td>
                                      <b onClick={()=>handleclick(vehicle.id)} style={{cursor:'pointer'}}> <FontAwesomeIcon icon={faTrash } style={{color: "#e40707",fontSize:'25px'}} />  </b>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* <Link to="/" style={{fontFamily:'sans-serif',fontSize:'20px',letterSpacing:'1px',color:'red'}}>back</Link>    */}
            </table>

            
    </>
  )
}

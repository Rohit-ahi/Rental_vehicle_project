

import React, { useEffect, useState } from 'react'
// import { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import '../Cardetail.css'
import Navbar from '../pages/Navbar'
import Booking from './Booking'
// import { setcar } from '../redux/createslice'




export default function Details() {
   
     const tok = useSelector(state=>state.login.token)

    console.log('running function')

     const{id} = useParams()
     const[car,setCar] = useState(null)

     const[showbooking,setshowbooking] = useState(false)
     console.log('showbooking :',showbooking)
    
   
    // const car = useSelector(state=>state.login.car)


     console.log('id',id)
     console.log('car',car)

         useEffect(()=> {

        console.log('useeffect running')
        
          
        fetch(`http://localhost:8080/auth/customer/vm_list/${id}`,{

            headers : {
                 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${tok}`
            },
        }) 
        .then(response => response.json())
        .then(data =>  {
                console.log('response data :', data)
                 setCar(data)
                // dispatch(setcar(data))

        })
        .catch(error => console.error('Error fetching car details:', error));


      },[tok, id])

     if (!car) return <p>Loading...</p>;
      
  return (
      <>  
                     {console.log('running render')}
         <Navbar/> 
            <div className='container7 '>
                <div className="card7">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={car.veh_master.image||''} alt={car.model||''} className="card-img-top7" />
                        </div>

                        <div className="col-md-4">
                            <h2 className="card-title7">{car.veh_master.model}</h2>
                            <p className="card-text7">Type : {car.veh_master.type}</p>
                            <p className="card-text7">Capacity (Seats) : {car.veh_master.capacity_seats}</p>
                            <p className="card-text7">Capacity (Tons) : {car.veh_master.capacity_tons} </p>
                            <button className="btn-success" onClick={()=>setshowbooking(true)}>Book Now</button>
                        </div>

                        <div className="col-md-4">
                            {/* <h2 className="card-title7">{car.veh_master.model}</h2> */}
                            <br /><br /><br />
                            <p className="card-text7">Ac_charges : ${car.ac_charges}/km</p>
                            <p className="card-text7">PUC status : {car.ispuc ? "Yes" : "No"}</p>
                            <p className="card-text7">Insurance : {car.isinsurance ? "Yes" : "No"}</p>
                            {/* <button className="btn-success">Book Now</button> */}
                        </div>

                    </div>
                </div>
            </div>


    {showbooking && (
                //   <Booking vehicleid ={car.veh_master.id}/>

        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={() => setshowbooking(false)}>
              &times;
            </span>
            <Booking vehicleid={car.veh_master.id} />
          </div>
        </div>

    )}
        
      </>
  )
}

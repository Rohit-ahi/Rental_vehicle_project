


import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from '../pages/Navbar'
import '../Carlist.css'

export default function Vcustomerlist() {

     const tok = useSelector(state=>state.login.token)

    const[cars,setCars] = useState([])
    
    useEffect(() => {
     
         try {
                 fetch('http://localhost:8080/auth/customer/vm_list', {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${tok}`
                 },
             }).then(res=>res.json()).then(data=>  {
                  console.log('customer data Response:', data);
                  setCars(data)
             } )
 
         } catch (error) {
             console.error("Error fetching vehicle list:", error);
           
         }
     
 }, [tok]);
  return (
     <>

          <body className='bodycar'>
            
               
            <Navbar/>

            <div className="container1 my-5">
            <h2 className="mb-4">Available Cars</h2>
            <div className="row">
                {cars.map(car =>(
                     
                    <div key={car.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={car.veh_master.image} alt={car.model} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{car.veh_master.model}</h5>
                                <p className="card-text">Price: ${car.price_km}/km</p>
                                <Link to={`/details/${car.id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
        </body>    
     </>
  )
}


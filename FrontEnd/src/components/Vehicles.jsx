
import React from 'react'
import '../vehicle.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import Navbar from '../pages/Navbar';

export default function Vehicles() {
    
    const tok = useSelector(state=>state.login.token)
    console.log("tok:",tok)

    const [msg,setmsg] = useState()
    const [vehicleMasters, setVehicleMasters] = useState([]);
    const [selectedMaster, setSelectedMaster] = useState(null);
    const [formData, setFormData] = useState({
      reg_number: '',
      fuel_type: '',
      price_km: '',
      ac_charges: '',
      ispuc: false,
      isinsurance: false,
      status : true
    });

console.log('selectedMaster :',selectedMaster)
console.log('vehiclemaster :',vehicleMasters)

    useEffect(() => {
        fetch('http://localhost:8080/auth/sp/list_vm',{
            method:"GET",
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${tok}`   
            }
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Fetched data:', data); 
            if (Array.isArray(data)) {
              setVehicleMasters(data);
              console.log('jhfhjfjjkfkjkjfkjk')
            } else {
              setVehicleMasters([]);
              console.error('Fetched data is not an array:', data);
            }
          })
          .catch((error) => console.error('Error fetching vehiclemasters:', error));
      }, [tok]);


      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log('e.target.value',e.target.value)
        console.log('e.target.name',e.target.name)
      };

      
      
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const dataToSend = {
          ...formData,
          master: selectedMaster, // Selected Vehiclemaster की ID
        };

         try {
            const result =  await fetch('http://localhost:8080/auth/sp/vehiclesave', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${tok}`
                },
                body: JSON.stringify(dataToSend),
              })
    
              const resdata = await result.json()
              console.log('resdata :', resdata)
          
               if(resdata.status) {
                    setmsg(resdata.msg)
               }
               setmsg(resdata.msg)
    
         } catch (error) {
            console.log('err :',error)
         }
            // .then((response) => response.json())
            // .then((data) => console.log('Vehicle saved:', data))
            // .catch((error) => console.error('Error saving vehicle:', error));

               e.target.reset()
        };

  return (
    <>
                 
{/* 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stylish Form</title>
    <link rel="stylesheet" href="styles.css">
</head> */}

<body className='body9'>
  
<Navbar/>
{/* <h2 style={{fontSize:'28px',letterSpacing:'1.5px' ,textAlign:'left'}}>Add Vehicles</h2> */}
<div className="form-container2">
        <form onSubmit={handleSubmit}>
            <div className="row mt-3">
                <div className="form-group col-lg-6 col-md-6">
                    <input type="text" className="form-control" placeholder="Reg Number" name='reg_number' onChange={handleInputChange} required/>
                </div>

                <div className="form-group col-lg-6 col-md-6">
                    
                    {/* <input type="text" className="form-control"  placeholder="fuel_type" name='fuel_type'  onChange={handleInputChange} required/> */}
                    <select id="dropdown" className="form-control"  onChange={handleInputChange} name='fuel_type' >
                           <option value="">Select fuel_type</option> 
                           <option value={'petrole'}>petrole</option>
                           <option value={'diesel'}>diesel</option>
                          
                    </select>

                </div>
            </div>
            <div className="row mt-3">
                <div className="form-group col-lg-6 col-md-6">
                    
                    <input type="number" className="form-control"  placeholder="Price_km" name='price_km' onChange={handleInputChange} required/>
                </div>
                <div className="form-group col-lg-6 col-md-6">
                    
                    <input type="number" className="form-control"  placeholder="Ac_charges" name='ac_charges' onChange={handleInputChange} required/>
                </div>
            </div>

            

            <div className="row mt-3">
                
                <div className="form-group col-lg-12 col-md-12">
                    
                    <select id="dropdown" className="form-control" value={selectedMaster} onChange={(e)=>setSelectedMaster(e.target.value)} >
                         <option value="">Select VehicleMaster</option> 
                        {vehicleMasters.map((master) => (
                           <option key={master.id} value={master.id}>
                                  {master.model} 
                           </option>
               ))}
                    </select>
                </div>
            </div>

            <div className="row mt-3">
                <div className="form-group col-lg-6 col-md-6">
                     <label for="input5" style={{fontSize:'20px'}}>is PUC</label> 
                    <input type="checkbox" className="form-control" id='input5' placeholder="ispuc" checked={formData.ispuc} name='ispuc'  onChange={(e)=>setFormData({...formData,ispuc:e.target.checked})} />
                </div>
                <div className="form-group col-lg-6 col-md-6">
                     <label for="input6" style={{fontSize:'20px'}}>is Insurance</label> 
                    <input type="checkbox" className="form-control" id='input6' placeholder="isinsurance" checked={formData.isinsurance} name='isinsurance'  onChange={(e)=>setFormData({...formData,isinsurance:e.target.checked})} />
                </div>
            </div>
            <button type="submit" className="submit-btn2">Submit</button>
            <br /><br />
             <div className='row'>
             <div className='col-lg-10 col-md-10'>
                        <Link to="/Vehicle_list" style={{fontFamily:'sans-serif',fontSize:'20px',letterSpacing:'1px'}}>View Vehicles</Link>   
                </div>
                <div className='col-lg-2 col-md-2'>
                        {/* <Link to="/" style={{fontFamily:'sans-serif',fontSize:'20px',letterSpacing:'1px'}}>back</Link>    */}
                </div>
             </div>
        </form>        <br />
        <b style={{letterSpacing:'1px',color:'red',fontFamily:'sans-serif'}}>{msg}</b>
    </div> 


    </body>

    </>
  )
}



import React from 'react'
import { Link } from 'react-router-dom'
import '../Vmadd.css'
import { useRef,useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../pages/Navbar'

export default function Vehiclemaster() {

    const tok = useSelector(state=>state.login.token)
    const[msg,setmsg] = useState()

    const model = useRef()
    const value = useRef()
    const image = useRef()
    const capacity_seats = useRef()
    const capacity_tons = useRef()

  

const handleform = async (e)=>{

  e.preventDefault()
  const vmformdata = new FormData();
  vmformdata.append('model', model.current.value);
  vmformdata.append('type', value.current.value);
  vmformdata.append('capacity_seats', capacity_seats.current.value);
  vmformdata.append('capacity_tons', capacity_tons.current.value);
  vmformdata.append('image', image.current.files[0]);

      try {
             const result = await fetch('http://localhost:8080/auth/admin/save_vm', {
                    method : 'POST',
                    headers: {
                          'Authorization':  `Bearer ${tok}`
                    },
                    body :vmformdata
             })

             const resdata = await result.json()
             console.log('resdata :',resdata)

             if(resdata.status) {
                   setmsg(resdata.msg)
             }
             setmsg(resdata.msg)

      } catch (error) {
          setmsg('try again later ')
      }

      e.target.reset()
}

  return (
    <>
           <Navbar/>
        <body>

        <section>
          <div className="wrapper"id='d1' >
         <div className="form">
             <h1 className="title">Add Vehiclemaster</h1>

             <form action="#" className="myform" onSubmit={handleform}>
                 <div className="control-from">
                      {/* <label for="firstname">Name *</label>  */}
                     <input type="text" id="firstname" placeholder='Model' ref={model}  required/>
                 </div>

                 <div>
                     
                     {/* <input type="text" id="lastname" placeholder='Type'ref={type} required/> */}
                     <select className="form-control" ref={value}>
                                <option value="">Type</option>
                                <option value="Rental">Rental</option>
                                <option value="Transeport">Transport</option>
                     </select>

                 </div>

                  <div className="control-from">
                     <input type="number" id="lastname" placeholder='capacity_seats'ref={capacity_seats} required min={'0'}/>
                 </div>

                  <div className="control-from">
                     <input type="number" id="lastname" placeholder='capacity_tons'ref={capacity_tons}  required/>
                 </div>


                 <input type="file" id="emailaddress" placeholder='image' ref={image} required style={{color:'black'}} />

                 <div className="button">
                     <button id="register">Submit</button>

                 </div>

                 <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                            {/* <Link to='/' style={{color:'white'}}><b>BACK</b></Link> */}
                            <Link to="/Vmasterlist" style={{color:'black',fontSize:'20px',fontWeight: 'bold',letterSpacing:'0.8px'}}>View VMaster</Link>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                                
                        </div>
                 </div>


             </form>

                       <b style={{color:'red',letterSpacing:'1px'}}>{msg}</b>
            </div>

        </div>

     </section>
     </body>
    </>
  )
}

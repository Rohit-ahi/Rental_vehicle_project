


import React from 'react'
import '../Sp.css'
import { Link} from 'react-router-dom'
import { useRef } from 'react'
import Navbar from '../pages/Navbar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SpReg() {

     // const[msg,setmsg] = useState()

      const spname = useRef()
      const spphone = useRef()
      const spemail = useRef()
      const sppass = useRef()
      const spcompany = useRef()
      const spaddress = useRef()
      const spreg = useRef()
      const spcontact = useRef()
      const spcontactp = useRef()

  const handleform = async (e)=>{
        
    e.preventDefault()
        const spformdata = {
              
               name : spname.current.value,
               phone : spphone.current.value,
               email : spemail.current.value,
               password : sppass.current.value,
               company_name : spcompany.current.value,
               contact : spcontact.current.value,
               reg_number : spreg.current.value,
               contact_person : spcontactp.current.value,
               address : spaddress.current.value
        }

        try {
               const result = await fetch('http://localhost:8080/rental/sp_reg', {
                      method : 'POST',
                      headers : {
                         'Content-Type':'application/json'
                      },
                      body : JSON.stringify(spformdata)  
               }) 

               const resdata = await result.json()
               console.log('resdata :',resdata)

               if(resdata.status) {
                     //setmsg(resdata.msg)
                     toast.success(resdata.msg, {
                        position: 'top-center',
                        autoClose: 8000, // Auto-close after 3 seconds
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
               }else {
                toast.error(resdata.msg, {
                    position: 'top-center',
                    autoClose: 8000, // Auto-close after 3 seconds
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
               }
               
               //setmsg(resdata.msg)   

        } catch (error) {
            //setmsg('try again later ')
            console.log("error :",error)
        }

        e.target.reset()
  }

  return (
    <>
    {/* <body>
        
    <section>
      <div className="wrapper0"id='d1' >
     <div className="form0">
         <h1 className="title0">Service Provider Register</h1> 

         <form action="#" className="myform0" onSubmit={handleform}>
             <div className="control-from0"> 
                 
                 <input type="text" id="firstname" placeholder='Name' ref={spname}  required/>
             </div>

             <div className="control-from">
                 <input type="number" id="lastname" placeholder='Phone'ref={spphone} required/>
             </div>

             <div className="control-from">
                 
                 <input type="email" id="emailaddress" placeholder='Email' ref={spemail} required/>
             </div>

             <div className="control-from">
                 <input type="Password" id="phonenumber" placeholder='Password' ref={sppass} required/>
             </div>

             <div className="full-width">
            
                 <input type="text" id="companyname" placeholder='Company_Name'ref={spcompany} required/>
             </div>

             <div className="control-from">
                 
                 <input type="text" id="address" placeholder='Address'ref={spaddress} required/>
             </div>

             <div className="control-from">
                 
                 <input type="text" id="contact"placeholder='Contact'ref={spcontact}  required/>
             </div>

             <div className="control-from">
                 
                 <input type="text" id="reg" placeholder='Reg_Number'ref={spreg} required/>
             </div>

             <div className="control-from">
                
                 <input type="text" id="location" placeholder='Contact_Person'ref={spcontactp} required/>
             </div>

             <div className="button0">
                 <button id="register">Register</button>
                 
             </div>

             <div className='row'>
                    <div className='col-lg-12 col-md-6'>
                        <Link to='/' style={{color:'white'}}><b>BACK</b></Link>
                    </div>
                    <div className='col-lg-12 col-md-6'>
                           <p style={{color:'white'}}>Already register? <Link to="/login" style={{color:'red',fontSize:'15px',fontWeight: 'bold',letterSpacing:'1px'}}>Log in Now</Link></p> 
                    </div>
             </div>
              
              
         </form>

                   <b style={{color:'red',letterSpacing:'1px'}}>{msg}</b>
        </div>
        
    </div> 

 </section>
 </body>  */}




<body>
          <Navbar/>
    <section>
        <div className="wrapper0" id='d1'>
            <div className="form0">
                <h1 className="title0">Service Provider Register</h1>
                <form action="#" className="myform0" onSubmit={handleform}>
                    <div className="flex-row">
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="text" id="firstname" placeholder='Name' ref={spname} required />
                            </div>
                        </div>
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="number" id="lastname" placeholder='Phone' ref={spphone} required />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="email" id="emailaddress" placeholder='Email' ref={spemail} required />
                            </div>
                        </div>
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="password" id="phonenumber" placeholder='Password' ref={sppass} required />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="text" id="companyname" placeholder='Company Name' ref={spcompany} required />
                            </div>
                        </div>
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="text" id="address" placeholder='Address' ref={spaddress} required />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="text" id="contact" placeholder='Contact' ref={spcontact} required />
                            </div>
                        </div>
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="text" id="reg" placeholder='Reg Number' ref={spreg} required />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-item">
                            <div className="control-from0">
                                <input type="text" id="location" placeholder='Contact Person' ref={spcontactp} required />
                            </div>
                        </div>
                    </div>
                    <div className="button0">
                        <button id="register" type="submit">Register</button>
                    </div>
                    {/* <div className="message">{msg}</div> */}
                    <div className='row'>
                        <div className='col-lg-12 col-md-6'>
                            {/* <Link to='/' style={{ color: 'white' }}><b>BACK</b></Link> */}
                        </div>
                        <div className='col-lg-12 col-md-6'>
                            <p style={{ color: 'black' }}>Already registered? <Link to="/login" style={{ color: 'red', fontSize: '15px', fontWeight: 'bold', letterSpacing: '1px' }}>Log in Now</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</body>


<ToastContainer />  

    </>
  )
}

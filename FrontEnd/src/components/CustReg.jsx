
import React, { useRef } from 'react'
import '../Reg.css'
import {Link} from 'react-router-dom'
import Navbar from '../pages/Navbar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function CustReg() {

       //const[msg ,setmsg] = useState()


        const custname = useRef()
        const custphone = useRef()
        const custemail = useRef()
        const custpassword = useRef()

const custreg   =   async(e)=>{
                   
         e.preventDefault() 

        const custdata = {

            name : custname.current.value,
            phone : custphone.current.value,
            email : custemail.current.value,
            password : custpassword.current.value
       }
       
       try {
        
            const result = await fetch('http://localhost:8080/rental/cust_reg' , {
                 method : 'POST' ,
                 headers : {
                      'Content-Type' : 'application/json'
                 },
                 body : JSON.stringify(custdata)       
           })

           const resdata = await result.json()
           console.log('resdata :', resdata)
      
           if(resdata.status) {
                //setmsg(resdata.msg)
                console.log("resdata :",resdata)
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
                //setmsg('try Again Later')
                console.log('err',error)
        }

        e.target.reset()
    }
        
  return (
      <>

{/* <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Netflix Login Page | CodingNepal</title>
    <link rel="stylesheet" href="style.css">
</head> */}

    {/* <div style={{ background: "url(../images/banner.jpg)"}}>
     */}


   {/* <body> 

    
    <div className="form-wrapper" style={{overflow:'hidden'}}>
        <h2>Customer Register</h2>
        <form onSubmit={custreg}>

           <div className="form-control">
                <input type="text" id="name" placeholder='Name' required  ref={custname}  />
            </div>  

            <div className="form-control">
                <input type="number"  id="num" placeholder='Phone Number'ref={custphone} required/> 
            </div>

            <div className="form-control">
                <input type="email" id="mail"  placeholder='Email' ref={custemail} required/>     
            </div>

            <div className="form-control">
                <input type="password" id="pass" placeholder='Password' ref={custpassword}  required/>
            </div>

            <button type="submit" className='bt'>REGISTER</button>
            <br /><br />

            <div className="form-help"> 
                <div className="remember-me">
                         <Link to="/SpReg" style={{fontWeight: 'bold', fontSize:'17px' }} className='sp'>SP REGISTER</Link> 
                </div>
                         <Link to="/" style={{fontSize:'15px', fontWeight: 'bold'}} className='sp'>BACK</Link>
            </div>

           
            
        </form>
         
        <div>
            <b style={{letterSpacing:'1px',color:'red'}}>{msg}</b>
            <p>Already register? <Link to="/login">Log in Now</Link></p>
        </div>
        
        <small>
                 
            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
            <a href="/#">Learn more.</a>
        </small>
        
    </div>
   
   </body>  */}

<body>
       <Navbar/>

    <div className="form-wrapper">
        <h2>Customer Register</h2>
        <form onSubmit={custreg}>
            <div className="form-control">
                <input type="text" id="name" placeholder='Name' required ref={custname} />
            </div>
            <div className="form-control">
                <input type="number" id="num" placeholder='Phone Number' ref={custphone} required />
            </div>
            <div className="form-control">
                <input type="email" id="mail" placeholder='Email' ref={custemail} required />
            </div>
            <div className="form-control">
                <input type="password" id="pass" placeholder='Password' ref={custpassword} required />
            </div>
            <div className="button-container">
                <button type="submit" className='bt'>REGISTER</button>
            </div>
            <div className="form-help">
                <div className="remember-me">
                    <Link to="/SpReg" style={{fontWeight: 'bold', fontSize:'17px' }} className='sp'>SP REGISTER</Link>
                </div>
                {/* <Link to="/" style={{fontSize:'15px', fontWeight: 'bold'}} className='sp'>BACK</Link> */}
            </div>
            <div>
                {/* <b style={{letterSpacing:'1px',color:'red'}}>{msg}</b> */}
                <p style={{color:'black'}}>Already registered? <Link to="/login">Log in Now</Link></p>
            </div>
           
            {/* <small>
                This page is protected by Google reCAPTCHA to ensure you're not a bot. 
                <a href="/#">Learn more.</a>
            </small> */}
        </form>
    </div>
</body>

<ToastContainer />
      </>
  )
}


import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../Form.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { Loginuser } from './Auth'
import Navbar from '../pages/Navbar'


//import {data} from '../redux/createslice'


export default function Login() {
          console.log('running function')
         const [email , setemail] = useState('')
         const [password , setpassword] = useState('')

          const navigate = useNavigate()
        

         const dispatch = useDispatch()
         const loginstatus = useSelector(state=> state.login.status) // jab component pahli bar render hoga to ye intial state access karega 
           console.log("loginstatus :" , loginstatus)                                                          //  jab bhi redux store main state upadte hoti ye autometicaly update state ko access kar lega
                                                                     //  usselector ke pass hamesha letest state hoti hai chahe bo initial ho ya updated
                                                                     //  iske pass bo state jati hai jo redux store main currently store hoti hai.
         const loginerror = useSelector(state=> state.login.error)
           console.log("loginerror :" , loginerror)
           
         // const loginuser = useSelector(state=>state.login.user)  // token yahan ayegi 
         // console.log('loginuser :',loginuser)
          

         // const token = loginuser.data
         //console.log('token :',loginuser)

         const handlesubmit = (e)=>{
            console.log('e:', e)
              e.preventDefault();   
              const userdata = {email,password}
              dispatch(Loginuser(userdata))
              console.log('userdata :' , userdata)
             
             
         }

         useEffect(() => {
               console.log('running useeffect')

            if (loginstatus === 'succeeded') {          
              navigate('/')
              
            }
          }, [loginstatus, navigate])

         

  return (
      <>

          {console.log('render running')}   
          <Navbar/>
           
       <body translate='no'style={{background: "url(../images/banner.jpg)"}} > 

       
             
      <section className="container2">
        <div className="login-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
                  <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />  
                <h1 className='opacity' >LOGIN</h1>


                <form onSubmit={handlesubmit}>

                    <input type="email" placeholder=" EMAIL" value={email} onChange={(e)=>setemail(e.target.value)}  required/>
                    <input type="password" placeholder="PASSWORD" value={password} onChange={(e)=>setpassword(e.target.value)} required />
                    <button className="opacity" type='submit'> SUBMIT </button>
                      
                </form>

                      {loginstatus === 'failed' && <p className='register-forget opacity' style={{fontWeight:'bold' , color:'red'}}>{loginerror}</p>}
               

                <div className="register-forget opacity">
                     <Link to="/CustReg">REGISTER</Link>
                     <Link className="nav-link"to="/"> BACK </Link> 
                </div>

            </div>
            <div className="circle circle-two"></div>
        </div>
        <div className="theme-btn-container"></div>
    </section>              
</body>               
                  

    </>
  )
}

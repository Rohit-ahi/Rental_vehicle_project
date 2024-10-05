import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { clearToken } from '../redux/createslice'
import { useState } from 'react'
import '../popup.css'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
   const dispatch = useDispatch()
   
      const role = useSelector(state=>state.login.role)
      console.log('role :',role)
   
   //  const logout = ()=>{
    
   //     dispatch(clearToken())
   // }

    const navigate = useNavigate()
   const [showpopup, setpopup] = useState(false)
   

   const logoutclick= ()=>{
          setpopup(true)
   }

   const ConfirmLogout = ()=>{

      dispatch(clearToken())
       setpopup(false)
       navigate('/');
        
   }

   const CancelLogout = ()=> {
       setpopup(false)
   }

   // const loginuser = useSelector(state=> state.login.user)
    const tok = useSelector(state=> state.login.token)
    console.log("tok :", tok)
   // console.log("loginuser :", loginuser)

   return <>

<header>
   
   <div className="header">
      <div className="container">
         <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
               <div className="full">
                  <div className="center-desk">
                     <div className="logo">
                        {/* <a href="index.html"> */}
                           <img src="images/logo.png" alt="" />
                           
                           {/* </a> */}
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
               <nav className="navigation navbar navbar-expand-md navbar-dark ">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarsExample04">
                     <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                           <Link className="nav-link" to="/"> Home  </Link>
                        </li>
                        
                        
        
                     </ul>

               
                   {  
                       tok===null ?
                      
                     <>

                     <ul className="navbar-nav mr-auto">
                          <li className="nav-item">
                           <Link className="nav-link" to="/Why_choose">Why Choose Us</Link>
                        </li>

                        <li className="nav-item">
                           <Link className="nav-link" to="/Cars">Cars</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/Contact">Contact us</Link>
                        </li>
                     </ul>

                     <div className="sign_btn" style={{marginRight: '10px'}}> 
                        <Link to="/Login">log in</Link> 
                     </div>

                     <div className="sign_btn" style={{display : 'inline'}}> 
                        <Link to="/CustReg">Register</Link> 
                     </div>

               </>

                     :
                       
               <>

                  
                     <ul className="navbar-nav mr-auto">
                      { role ==='service_provider' &&( 
                        
                            <li className="nav-item">
                              <Link className="nav-link" to="/Vehicle_list">Vehicles</Link>
                           </li> 

                     )} 

                     { role ==='admin' && (
                        
                     <>
                        <li className="nav-item">
                              <Link className="nav-link" to="/Users">Users</Link>
                       </li>

                        <li className="nav-item">
                             <Link className="nav-link" to="/Vmasterlist">VMaster</Link>
                       </li>
                        <li className="nav-item">
                              <Link className="nav-link" to="/Vehiclelistadmin">Vehicles</Link>
                        </li> 

                     </>

                   )}  

                   { role ==='customer' && ( 
                     <>        
                        <li className="nav-item">
                               <Link className="nav-link" to="/Vcustomerlist">Cars</Link>
                        </li> 

                        <li className="nav-item">
                               <Link className="nav-link" to="/BookingHistory">Booking</Link>
                        </li> 
                     </>      
                  )} 


                     </ul>
                  
                      <div className="sign_btn" style={{marginRight: '10px'}} > 

                      <button className='btn btn-warning' onClick={logoutclick}>log out</button>

                      {showpopup && (
                         <div className="popup">
                           <div className="popup-inner">
                             <h2 style={{color:'black'}}>Are you sure you want to logout?</h2>
                             <button onClick={ConfirmLogout}>Yes</button>
                             <button onClick={CancelLogout}>No</button>
                           </div>
                         </div>
                       )}

                     </div>
                   

                  </>
  
               }

                  </div>
               </nav>
            </div>
         </div>
      </div>
   </div>
</header>

         </>
}
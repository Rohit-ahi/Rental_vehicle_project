

import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import '../tablev.css'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { Link } from 'react-router-dom'
//import { confirmAlert } from 'react-confirm-alert'; 
//import 'react-confirm-alert/src/react-confirm-alert.css'; 



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar'

export default function Users() {

  const tok = useSelector(state=>state.login.token)

  const[user,setuser] = useState([])
//   const[vehicle,setvehicle] = useState([])
//   const[sp,setsp] = useState([])
//   const[msg,setmsg] = useState()

//   console.log('user :',user)
//   console.log('msg :',msg)

  useEffect(() => {
   
    try {
               fetch('http://localhost:8080/auth/admin/userlist', {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${tok}`
               },
           }).then(res=>res.json()).then(data=> setuser(data) )

       } catch (error) {
           console.error("Error fetching vehicle list:", error);
           
       }


                                                              // vehicle_list
    try {
        fetch('http://localhost:8080/auth/admin/vehiclelist', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tok}`
        },
    }).then(res=>res.json()).then(data=>  {
        //  console.log('API Response:', data);
        //    data.map(ob=> {
          
        //     const uid = ob.user.id
        //     console.log('vid:', uid)
        //      return uid
              
              console.log("vehicle data :",data)
            //   setvehicle(data)
             
        })
         
} catch (error) {
    console.error("Error fetching vehicle list:", error);
   //  setmsg('An error occurred, please try again later.');
}


                                                              // serviceprovider_list
    try {
           fetch('http://localhost:8080/auth/admin/splist', {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${tok}`
           },
       }).then(res=>res.json()).then(data=>  {
    
        //   console.log("sp data :",data)
        //   setsp(data)
         
     })
     
} catch (error) {
console.error("Error fetching vehicle list:", error);
//  setmsg('An error occurred, please try again later.');
}


}, [tok]); // Dependency array

           const handleclick = (uid)=> {
                   
            console.log('userid :',uid)
            // console.log('vid :',vid)
            //  console.log('spid :',spid)


                try {
                        const result = window.confirm('Are you sure you want to delete this item?');
                        if(result)  {

                        fetch(`http://localhost:8080/auth/admin/userdel/${uid}`,{
                            method : 'DELETE',
                            headers : {
                                 'Content-Type': 'application/json',
                                 'Authorization': `Bearer ${tok}`
                            }
                        }).then(res=>res.json()).then(data=> {
                               console.log('userdata :',data) 

                            if(data.status) {

                                    // setvehicle(vehicle.filter(ob=>ob.id!==vid))
                                    // setsp(sp.filter(ob=>ob.id!==spid))
                                    //console.log('error msg :',data.msg)
                                    
                                        setuser(user.filter(ob=>ob.id!==uid))
                                   
                            }  

                            else {
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

                    }

                } catch (error) {
                            console.error("Error deleting vehicle:", error)
                      }

           }

  return (
     <>
             <body>
                
                    <Navbar/>
                  <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        {/* <th>Password</th> */}
                        <th>Role</th>
                        <th>Status</th>
                        <th>Delete</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {user.map((user) => { 
                       
                    console.log('user_id :',user.id) 

                    // const spl = sp.find(ob=>ob.userrec.id===user.id)
                    // const spid = spl ? spl.id : null;
                    
                     
                    return(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.password}</td> */}
                            <td>{user.role}</td>
                            <td>{user.status ? 'Active' : 'Inactive'}</td>
                            <td>
                                      <b onClick={()=>handleclick(user.id)} style={{cursor:'pointer'}}> <FontAwesomeIcon icon={faTrash } style={{color: "#e40707",fontSize:'21px'}} />  </b>
                            </td>
                        </tr>
                    )
                 })}
                     
                </tbody>
                        {/* <Link to="/" style={{fontFamily:'sans-serif',fontSize:'20px',letterSpacing:'1px',color:'red'}}>back</Link>  */}
            </table>

            </body> 
            <ToastContainer />  
     </>
  )
}

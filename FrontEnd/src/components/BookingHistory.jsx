// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import moment from 'moment';
// import '../bookinghistory.css';  // Import your CSS
// import Navbar from '../pages/Navbar';

// export default function BookingHistory() {
//   const [history, setHistory] = useState([]);
//   const token = useSelector((state) => state.login.token);
//   console.log("history :", history);

//   useEffect(() => {
//     fetch('http://localhost:8080/auth/customer/booking-history', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, // Token for authenticated user
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('data :', data);
//         if (data) {
//           setHistory(data);
//         } else {
//           console.log('Failed to fetch booking history');
//         }
//       })
//       .catch((err) => console.log('Error:', err));
//   }, [token]);

//   return (

//         <>
             
//             <body style={{backgroundColor:'black'}}>
//              <Navbar/>
//             <div className="container mt-5 booking-container1z" >
//             <h3 className="text-center" style={{color:'red', fontSize:'20px',fontWeight: 'bold'}}>Your Booking History</h3>
//       <div className="row justify-content-center" >
//         {history.map((booking) => (
//           <div className="col-md-5 mb-5" key={booking.id}>
//             <div className="card booking-card1z shadow-sm" style={{backgroundColor:'black'}}>
//               <div className="card-header1z text-white">
//                 <h5 style={{color:'black', fontSize:'20px',fontFamily:'serif',fontWeight: 'bold'}}>
//                   Booking ID: {booking.id}
//                 </h5>
//               </div>
//               <div className="card-body1z">

//                 <div style={{display:'flex',justifyContent:'space-evenly'}}>
//                 <img
//                   src={booking.vm.image}
//                   alt={booking.vm.model}
//                   className="card-img-top1z"
//                   style={{ maxHeight: '130px', objectFit: 'cover' }}
//                 />
//                    <div>
//                          <p  style={{color:"#c28669"}}><strong  style={{color:"white"}}> User Name: </strong>{booking.user.name}</p>
//                          <p  style={{color:"#c28669"}}><strong  style={{color:"white"}}> Model : </strong>{booking.vm.model}</p>
//                          <p  style={{color:"#c28669"}}> <strong  style={{color:"white"}}> Type :</strong>{booking.vm.type}</p>
//                          <p  style={{color:"#c28669"}}> <strong  style={{color:"white"}}> Email :</strong>{booking.user.email}</p>


//                    </div>

//                </div>
//                 <div className="mt-3">
//                   <span className="badge badge-warning">
//                     {booking.status ? 'Completed' : 'Pending'}
//                   </span>
//                   <br />
//                   <p style={{color:"#c28669"}}><strong style={{color:"white"}} >Start Date: </strong>{moment(booking.start_date).format("DD MMM YYYY")}</p>
//                   <p  style={{color:"#c28669"}}><strong  style={{color:"white"}}>Pick Location: </strong>{booking.pick_location}</p>
//                   <p  style={{color:"#c28669"}}><strong  style={{color:"white"}}>Drop Location: </strong>{booking.drop_location}</p>
//                   <p  style={{color:"#c28669"}}><strong  style={{color:"white"}}>Days: </strong>{booking.days}</p>

//                 </div>

//                     {/* Vehicle Details
//                 <div className="d-flex justify-content-between">
//                   <button className="btn btn-outline-primary btn-sm">
//                   </button>
//                   <button className="btn btn-outline-secondary btn-sm">
//                     Customer Details
//                   </button>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//             </body>
//         </>
//   );
// }

























import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../pages/Navbar';

export default function BookingHistory() {


  const [history,setHistory] = useState([])
  const token = useSelector((state) => state.login.token);
  console.log("history :",history)

  useEffect(() => {
   
    fetch('http://localhost:8080/auth/customer/booking-history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Token for authenticated user
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log('data :',data)
         if(data) {
             setHistory(data); 
        } else {
             console.log('Failed to fetch booking history');
        }
      })
      .catch((err) => console.log('Error:', err));
  }, [token]);


  return (
    <>
             
         <body style={{backgroundColor:'black'}}>
          
         <Navbar/>  
    <div className=" mt-5">
      <h3 className="text-center" style={{color:'red'}}>Your Booking History</h3>
       <div  className="row justify-content-center" >  
        <div  className="col-md-8">
         
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Start Date</th>
                  <th>Pick-up Location</th>
                  <th>Drop Location</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>
                  <tbody>
                 {history.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.user.name}</td>
                    <td>{booking.user.email}</td>
                    <td>{booking.start_date}</td>
                    <td>{booking.pick_location}</td>
                    <td>{booking.drop_location}</td>
                    <td>{booking.days}</td>
                    <td> <span className="badge badge-warning">
                    {booking.status ? 'Completed' : 'Pending'}
                     </span></td>
                  </tr>
                ))} 
              </tbody>  
            </table>
        

          

        </div>
      </div>
    </div>
    </body> 

    </>
  );
}

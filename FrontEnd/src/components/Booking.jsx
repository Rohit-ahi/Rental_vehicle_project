
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../Booking.css'
import '../Notification.css'
import '../Payment.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import BookingHistory from './BookingHistory'

export default function Booking(vehicleid) {

         const tok = useSelector(state=>state.login.token)
         const bookdata = {
                             start_date: '',
                             pick_location: '',
                             drop_location: '',
                             days: '',
                          }
          
          
         const[bookingdata,setbookingdata] = useState({...bookdata})
         console.log('bokingdata :',bookingdata)

       // const [booklist,setbooklist] = useState(null)
        //console.log('booklist',booklist)


     //     const [modalMessage, setModalMessage] = useState('');
       // const[msgstatus,setmsgstatus] = useState('')

     //     const[showModal,setShowModal] = useState(false)

         const hendledata = (e)=> {
              setbookingdata({

                  // e.target.name : e.target.value  - ye galat hai
                    ...bookingdata ,
                    [e.target.name] : e.target.value
              })  
         }

         console.log('bookingdata', bookingdata)

         const senddata = {

            vmaster: vehicleid.vehicleid,
            start_date : bookingdata.start_date,
            pick_location : bookingdata.pick_location,
            drop_location : bookingdata.drop_location,
            days : bookingdata.days ,
                 
         }

         console.log('senddata :',senddata)


        const handleBookingSubmit = (e)=> {
            e.preventDefault()
            
              fetch('http://localhost:8080/auth/customer/vehicle-booking', {
                    method:'POST',
                    headers : {
                        'Content-Type' : 'application/json' ,
                         'Authorization' : `Bearer ${tok}`
                    },
                    body : JSON.stringify(senddata)
              }) 
              
              
              .then(res=> res.json()).then(data=> {
                      //  setbooklist(data.data)
                       console.log('data**:',data) 
                       if(data.status) {
                         //setModalMessage('Vehicle booked successfully');
                          //setmsgstatus('success')
                         toast.success('Vehicle booked successfully', {
                              position: 'top-center',
                              autoClose: 3000, // Auto-close after 3 seconds
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                         
                         setbookingdata({...bookdata})
                         
                         
                    }else {
                         //setModalMessage('Failed to book the vehicle');
                          //setmsgstatus('failed')
                         toast.error('Failed to book the vehicle', {
                              position: 'top-center',
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                         setbookingdata({...bookdata})
                    }
                  
              })
              .catch(err=> console.log('error :',err))
            
        }

    //  const handlePayment = () => {
          
    //       alert('Proceeding to payment...');
    //   };
      

  return(
     <>
          <div className="container0 mt-5">
      <h3 className="text-center">Vehicle Booking</h3>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleBookingSubmit} className='form0'>
            <div className="mb-3">
              <label htmlFor="start_date" className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="start_date"
                name="start_date"
                value={bookingdata.start_date}
                onChange={hendledata}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pick_location" className="form-label">Pick-up Location</label>
              <input
                type="text"
                className="form-control"
                id="pick_location"
                name="pick_location"
                value={bookingdata.pick_location}
                onChange={hendledata}
                placeholder="Enter pick-up location"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="drop_location" className="form-label">Drop Location</label>
              <input
                type="text"
                className="form-control"
                id="drop_location"
                name="drop_location"
                value={bookingdata.drop_location}
                onChange={hendledata}
                placeholder="Enter drop location"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="days" className="form-label">Number of Days</label>
              <input
                type="number"
                className="form-control"
                id="days"
                name="days"
                value={bookingdata.days}
                onChange={hendledata}
                placeholder="Enter number of days"
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block" id='button0'>Submit Booking</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  

             {/* {msgstatus === 'success' && (
                <div className="d-grid gap-2 mt-3">
                    <button className="btn-payment" onClick={handlePayment} >
                        Proceed to Payment
                    </button>
                </div>
            )} */}

            
            {/* {booklist && (
                <BookingHistory
                    booklist={booklist}
                />
            )}   */}


<ToastContainer />

     
     </>
  )
}




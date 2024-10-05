
import Cars from "./pages/Cars";
import Home from "./pages/Home";
import Contact from './pages/Contact'
import Whychoose from "./pages/Why_choose";


import {Routes , Route} from 'react-router-dom'
//import Navbar from "./pages/Navbar";
//import Footer from "./pages/Footer";

import Login from "./components/Login";
// import Logout from "./components/Logout";
import CustReg from "./components/CustReg";
import SpReg from "./components/SpReg";
import Users from "./components/Users";
import Vehicles from "./components/Vehicles";
import Vehiclelist from "./components/Vehicle_list";
import Vehiclemaster from "./components/Vehiclemaster";
import Vehiclelistadmin from "./components/Vehiclelistadmin";
import Vmasterlist from "./components/Vmasterlist";
import Vcustomerlist from "./components/Vcustomerlist";
import Details from "./components/details";
import BookingHistory from "./components/BookingHistory";
// import Booking from "./components/Booking";
// import Vmasterupdate from "./components/Vmasterupdate";





export default function App(){

       return <>

              {/* <Navbar/> */}
              <Routes>
                       <Route path='/' element = { <Home/>  }/>
                       <Route path='/Cars' element = { <Cars/>  }/> 
                       <Route path='/Contact' element = { <Contact/>  }/>    
                       <Route path='/Why_choose' element = { <Whychoose/>  }/>
                       <Route path='/Login' element = { <Login/>  }/>
                       {/* <Route path='/Logout' element = { <Logout/>  }/>       */}
                       <Route path='/CustReg' element = { <CustReg/>  }/>
                       <Route path='/SpReg' element = { <SpReg/>  }/>
                       <Route path='/Users' element = { <Users/>  }/>
                       <Route path='/Vehicles' element = { <Vehicles/> }/>
                       <Route path='/Vehicle_list' element = { <Vehiclelist/>}/>
                       <Route path='/Vehiclemaster' element = { <Vehiclemaster/>}/>
                       <Route path='/Vehiclelistadmin' element = { <Vehiclelistadmin/>}/>
                       <Route path='/Vmasterlist' element = { <Vmasterlist/>}/>
                       <Route exact path='/Vcustomerlist' element = { <Vcustomerlist/>}/>
                       <Route path='/details/:id' element = { <Details/>}/>
                       {/* <Route path='/Vmasterupdate' element = { <Vmasterupdate/>}/> */}
                       {/* <Route path='/Booking' element = { <Booking/>}/> */}
                        <Route path='/BookingHistory' element = { <BookingHistory/>}/> 

             </Routes> 
 
          
       </>
} 
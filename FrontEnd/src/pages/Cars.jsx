import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Cars(){

        return <>
        
  
   
       <Navbar/> 
       <br />      
<div  classNameName="car">
   <div className="container">
      <div className="row">
         <div className="col-md-12">
            <div className="titlepage">
               <h2 style={{color:'black'}}>VARIETY OF CARS </h2>
               <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</span>
            </div>
         </div>
      </div>
      <div className="row">
         <div className="col-md-4 padding_leri">
            <div className="car_box">
               <figure><img src="images/car_img1.png" alt="#"/></figure>
               <h3>Hundai</h3>
            </div>
         </div>
         <div className="col-md-4 padding_leri">
            <div className="car_box">
               <figure><img src="images/car_img2.png" alt="#"/></figure>
               <h3>audi</h3>
            </div>
         </div>
         <div className="col-md-4 padding_leri">
            <div className="car_box">
               <figure><img src="images/car_img3.png" alt="#"/></figure>
               <h3>Bmw x5</h3>
            </div>
         </div>
      </div>
   </div>
</div><br />
<Footer/>
    </>
}
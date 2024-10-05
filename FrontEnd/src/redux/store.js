import { configureStore } from "@reduxjs/toolkit";
import Loginreducer from './createslice'


const store = configureStore({

      reducer : {
          login :  Loginreducer,  // login ke ander hoti , jab store ki state update hoti hai 
      }                           // useselctor hook ke through is state ko jo store main (chahe initial ho ya updated) 
})                                // kisi bhi component main access kar sakte ho.
       
export default store
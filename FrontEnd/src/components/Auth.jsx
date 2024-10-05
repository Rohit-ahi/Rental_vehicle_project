
import { createAsyncThunk } from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux'
// import { storeToken } from '../redux/createslice'

 export const Loginuser = createAsyncThunk('loginuser',async (userdata, { rejectWithValue })=>{  // yahan loginuser action create kar raha hai.
        
      try {
       
       const response = await fetch('http://localhost:8080/rental/login',{
             method : 'POST',
             headers : {
                  'Content-Type' : 'application/json'
             },
             body : JSON.stringify(userdata)
       })
  
        const data =  await response.json()
        console.log('receive data :', data)
       // return data   matlab jahan call karoge bahan token pahunch jayegi.
         //console.log("data status :",data)
 
       if (!data.status) {
             return  rejectWithValue(data.msg);   // yaha per rejectwithvalue api se aai error ko handel krata and createasyc fn ke rejected bale state main pass karta hai

           }

           console.log('data',data)
           const obj = data.data
           const token = obj.token
           const role = obj.role

          localStorage.setItem('token',token)
          localStorage.setItem('role',role)

           return {token,role};

      } catch (error) {
          return  rejectWithValue('Server Not Running');
      }

})
      




      // console.log('response :', response)
      // console.log('response :', response.ok)
      // if(!response.ok) {
      //        throw new Error("Invalid User");
      // }





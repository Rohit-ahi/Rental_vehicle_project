import { createSlice } from "@reduxjs/toolkit";
import { Loginuser } from "../components/Auth";


const Loginslice = createSlice({
       
      name : 'user',
      initialState : {
           
          //  car : null, 
           token : localStorage.getItem('token')||null,
           role : localStorage.getItem('role')||null ,
          //  user : null,  // ye bahi data store karega jo backend se login ke bad milega , jaise ki token or userinfo.
           status : 'idel' , // loading , success , failed
           error :   null   // error msg store hota jaise ki login fail hone per.   
      },
      
      reducers : {
                  //       storeToken: (state, action) => {
                  //         state.user = action.payload;
                  // },

                       clearToken: (state) => {
                        //  state.user = null;
                         state.status = 'idel';
                         state.token = null;
                         state.role = null
                         localStorage.removeItem('token')
                         localStorage.removeItem('role')
                  },

                  // setcar : (state,action)=> {
                  //        state.car = action.payload
                  // }
      } ,

      extraReducers : (builder)=> {

          builder 

            .addCase(Loginuser.pending , (state)=>{
                  state.status = 'loading'
             })
            .addCase(Loginuser.fulfilled , (state,action)=>{
              console.log("action.payload: ", action.payload);
                state.status = 'succeeded'
                // state.user = action.payload.token
                state.token = action.payload.token
                state.role = action.payload.role;
                localStorage.setItem('token',action.payload.token)
                localStorage.setItem('role',action.payload.role)
                
            })

            .addCase(Loginuser.rejected , (state,action)=>{
                state.status = 'failed'
                state.error  = action.payload
            })
      }       
})

export default Loginslice.reducer
export const {clearToken } = Loginslice.actions
export const {storeToken} = Loginslice.actions
// export const {setcar} = Loginslice.actions


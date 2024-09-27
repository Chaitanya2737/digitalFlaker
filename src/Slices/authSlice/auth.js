import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/api";

 const Auth = createSlice({
    name:"Auth",
    initialState :{
        isLoading: false,
        isError : false,
        token: null
    },
    extraReducers : (builder)=>{
        builder.addCase(registerUser.rejected , (state , action)=> {
            state.isError = true
            state.isLoading= false
        }).addCase(registerUser.pending , (state , action) => {
            state.isError = false
            state.isLoading= true
        }).addCase(registerUser.fulfilled , (state , action ) => {
            state.token = action.payload.token  
        })

        builder.addCase(loginUser.rejected , (state , action)=> {
            state.isError = true
            state.isLoading= false
        }).addCase(loginUser.pending , (state , action)=> {
            state.isError = false
            state.isLoading= true
        }).addCase(loginUser.fulfilled , (state , action)=> {
            state.token = action.payload.token  
           
        })
    }
})

export default Auth.reducer
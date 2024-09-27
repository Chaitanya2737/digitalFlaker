import { createSlice } from "@reduxjs/toolkit";
import { addCites, editCities, getCites,  } from "../../api/api";

const cites = createSlice({
    name:"state",
    initialState:{
        data : [],
        isLoading:false,
        isError:false,
    },
    extraReducers: (builder) =>{
        builder.addCase(getCites.pending , (state , action) =>{
            state.isLoading= true 
            state.isError = false
        }).addCase(getCites.rejected , (state , action) =>{
            state.isLoading= false 
            state.isError = true            
        }).addCase(getCites.fulfilled , (state , action) =>{
           state.data= action.payload
        }) 

        builder.addCase(addCites.pending , (state , action) =>{
            state.isLoading= true 
            state.isError = false
        }).addCase(addCites.rejected , (state , action) =>{
            state.isLoading= false 
            state.isError = true            
        }).addCase(addCites.fulfilled , (state , action) =>{
           state.data.push(action.payload)
        }) 

        builder.addCase(editCities.pending , (state , action) =>{
            state.isLoading= true 
            state.isError = false
        }).addCase(editCities.rejected , (state , action) =>{
            state.isLoading= false 
            state.isError = true            
        }).addCase(editCities.fulfilled , (state , action) =>{
            state.isLoading = false; 
            const updatedState = action.payload.editData; 

            state.data = state.data
                .filter(item => item._id !== updatedState._id) 
                .concat(updatedState); 
        }) 
    }
})

export default cites.reducer
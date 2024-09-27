import { createSlice } from "@reduxjs/toolkit";
import { addWarehouse, editWarehouse, getWarehouse } from "../../api/api";

const warehouse = createSlice({
    name: "warehouse",
    initialState : {
        data:[],
        isLoading:false,
        isError : false,
        errorMsg: ""
    },
    extraReducers : (builder) => {
        builder.addCase(getWarehouse.pending , (state , action ) => {
            state.isLoading = true ;
            state.isError =false
        }).addCase(getWarehouse.rejected , (state , action ) => {
            state.isLoading = false ;
            state.isError =true
        }).addCase(getWarehouse.fulfilled , (state , action) => {
            state.data = action.payload
        })

        builder.addCase(addWarehouse.pending , (state , action ) => {
            state.isLoading = true ;
            state.isError =false
        }).addCase(addWarehouse.rejected , (state , action ) => {
            state.isLoading = false ;
            state.isError =true
        }).addCase(addWarehouse.fulfilled , (state , action) => {
            state.data.push(action.payload)
        })

        builder.addCase(editWarehouse.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(editWarehouse.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(editWarehouse.fulfilled, (state, action) => {
            const updatedState = action.payload.editData; 
            const index = state.data.findIndex((item) => item._id === updatedState._id);        
          
            if (index !== -1) {
              state.data[index] = updatedState;
            }
            
            state.isLoading = false; 
            state.isError = false;  
          });
          
    }
})

export default warehouse.reducer
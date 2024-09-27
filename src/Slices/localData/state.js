import { createSlice } from "@reduxjs/toolkit";
import { addState, editState, getState } from "../../api/api";

const stateSlice = createSlice({
    name: "state",
    initialState: {
        data: [],
        isLoading: false,
        isError: false,
        errorMessage: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(getState.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getState.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message || "Failed to fetch state";
            })
            .addCase(getState.fulfilled, (state, action) => {
                state.isLoading = false; 
                state.data = action.payload; 
            });

        builder
            .addCase(addState.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addState.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message || "Failed to add state";
            })
            .addCase(addState.fulfilled, (state, action) => {
                state.isLoading = false; 
                state.data.push(action.payload); 
            });

            builder
            .addCase(editState.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(editState.fulfilled, (state, action) => {
                state.isLoading = false; 
                const updatedState = action.payload.updatedState; 
    
                state.data = state.data
                    .filter(item => item._id !== updatedState._id) 
                    .concat(updatedState); 
            })
            .addCase(editState.rejected, (state, action) => {
                state.isLoading = false; 
            });
    }
});

export default stateSlice.reducer;

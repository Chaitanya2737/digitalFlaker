import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser =  createAsyncThunk("register" , async (data , thunkError) => {
    try {     
        const res = await axios.post(`${process.env.REACT_APP_API}/register` , data);
        return res.data
    } catch (error) {
        console.log(error)
        return  thunkError.rejectWithValue(error.response.data)
    }
})


export const loginUser = createAsyncThunk("login" , async(data, thunkError) =>{
    try {
        const res =  await axios.post(`${process.env.REACT_APP_API}/login`,data);
        return res.data
    } catch (error) {
        console.log(error)
    }
})


export const getState =createAsyncThunk("getstate" ,async (token)=> {
    try {
        const res =   await axios.get(`${process.env.REACT_APP_API}/states` , {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        console.log(error)
    }
}) 



export const addState = createAsyncThunk("addState", async ({ data, token }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/states`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error adding state:", error);
        // Use rejectWithValue to pass the error message
        return rejectWithValue(error.response?.data || "Failed to add state");
    }
});


export const editState = createAsyncThunk(
  "editState",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API}/states`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data; 
    } catch (error) {
      console.error("Error editing state:", error);
      return rejectWithValue(error.response?.data || "Failed to edit state");
    }
  }
);

export const getCites =createAsyncThunk("getCites" ,async (token)=> {
    try {
        const res =   await axios.get(`${process.env.REACT_APP_API}/cities` , {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        });
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}) 

export const addCites = createAsyncThunk("addCites", async ({ data, token }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/cities`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error){
        console.error("Error adding city:", error);
        return rejectWithValue(error.response?.data || "Failed to add city");
    }
});

export const editCities = createAsyncThunk(
    "editState",
    async ({ data, token }, { rejectWithValue }) => {
      try {
        const res = await axios.put(`${process.env.REACT_APP_API}/cities`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return res.data; 
      } catch (error) {
        console.error("Error editing state:", error);
        return rejectWithValue(error.response?.data || "Failed to edit state");
      }
    }
  );


  export const getWarehouse =createAsyncThunk("getCites" ,async (token)=> {
    try {
        const res =   await axios.get(`${process.env.REACT_APP_API}/warehouse` , {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        });
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}) 

export const addWarehouse = createAsyncThunk(
  "addwarehouse", 
  async ({data, token} ,{rejectWithValue} ) => {

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/warehouse`, data, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error adding warehouse:", error);
      return rejectWithValue(error.response?.data || "Failed to add warehouse");

    }
  }
);

export const editWarehouse = createAsyncThunk(
  "editState",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API}/warehouse`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data; 
    } catch (error) {
      console.error("Error editing state:", error);
      return rejectWithValue(error.response?.data || "Failed to edit state");
    }
  }
);










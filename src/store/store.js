import { configureStore } from "@reduxjs/toolkit";
import Auth from "../Slices/authSlice/auth";
import state from "../Slices/localData/state";
import cites from "../Slices/localData/cites";
import warehouse from "../Slices/localData/warehouse";


const store = configureStore({
reducer :{
    Auth:Auth,
    State : state,
    Cites : cites,
    Warehouse:warehouse,
}
})

export default store
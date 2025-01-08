import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./redux-slice/userSlice";

// creating the redux store

const store = configureStore({
    reducer:{
      user: userSlice
    }
})

export default store;
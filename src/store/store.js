import { configureStore } from "@reduxjs/toolkit";
import authReduser from './auth_slice'


const store = configureStore({
    reducer:{
        auth:authReduser
    }
})

export default store
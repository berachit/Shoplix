import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false
}

export const userSlice = createSlice({
    name: "user" ,
    initialState,
    reducers: {
        logout: ( state ) => {
            state.status = false
        },
        login: ( state) => {
            state.status = true
        }
    }
})

export const {login , logout} = userSlice.actions

export default userSlice.reducer
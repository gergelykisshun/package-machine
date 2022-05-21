import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  name: ''
}

export const courierSlice = createSlice({
  name: "courier",
  initialState,
  reducers: {
    logInCourier: (state, action) => {
      state.isLoggedIn = true;
    },
    logOutCourier: (state, action) => {
      state.isLoggedIn = false;
    }
  },
  extraReducers: builder => {

  }
})

export const {logInCourier, logOutCourier} = courierSlice.actions;

export default courierSlice.reducer;
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
      state.isLoggedIn = action.payload.isLoggedIn;
      state.name = action.payload.name;
    },
    logOutCourier: (state, action) => {
      state.isLoggedIn = false;
      state.name = '';
    }
  },
  extraReducers: builder => {

  }
})

export const {logInCourier, logOutCourier} = courierSlice.actions;

export default courierSlice.reducer;
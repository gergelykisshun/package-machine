import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  status: 'idle',
  error: null
}

// FETCH MACHINE DATA            PUT MACHINE ID IN ENV!!!
export const fetchMachine = createAsyncThunk('machine/getMachineData', ( async (params, {dispatch, getState}) => {
  try {
    const res = await fetch('/api/v1/parcel/machine-data', {
      method: "POST",
      body: JSON.stringify({id: "62881843862ac039610c777f"}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await res.json();
    return result;
  } catch(err) {
    console.log(err);
  }
}));


export const dropOffPackage = createAsyncThunk('machine/dropOffPackage', (async (toSend, {dispatch, getState}) => {
  try {
    const dataToSend = {
      id: "62881843862ac039610c777f",
      data: toSend
    }
    const res = await fetch('/api/v1/parcel/dropOff', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });
    const response = await res.json();
    console.log(response)
  } catch(err){
    console.log(err);
  }
}));

export const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchMachine.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchMachine.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    }).addCase(fetchMachine.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
})

export const machineActions = machineSlice.actions;

export default machineSlice.reducer;
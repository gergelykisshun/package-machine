import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  status: 'idle',
  error: null
}

// FETCH MACHINE DATA 
export const fetchMachine = createAsyncThunk('machine/getMachineData', ( async (params, {dispatch, getState}) => {
  try {
    const res = await fetch('/api/v1/parcel/machine-data', {
      method: "POST",
      body: JSON.stringify({id: process.env.REACT_APP_MACHINE_ID}),
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

// INITIATE DROP-OFF
export const dropOffPackage = createAsyncThunk('machine/dropOffPackage', (async (toSend, {dispatch, getState}) => {
  try {
    const dataToSend = {
      id: process.env.REACT_APP_MACHINE_ID,
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
    return response;
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
      state.status = 'idle';
      state.data = action.payload;
    }).addCase(fetchMachine.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(dropOffPackage.pending, (state) => {
      state.status = 'loading';
    }).addCase(dropOffPackage.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload.success;
    }).addCase(dropOffPackage.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
})

export const machineActions = machineSlice.actions;

export default machineSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

// slice for global actions
export const globalSlice = createSlice({
  name: 'globalActions',
  initialState: {
    niubizScriptMounted: false,
    niubizFormMounted: false,
  },
  reducers: {
    setNiubizScriptMounted: (state, action) => {
      state.niubizScriptMounted = action.payload
    },
    setNiubizFormMounted: (state, action) => {
      state.niubizFormMounted = action.payload
    },
  },
})

export const { setNiubizScriptMounted, setNiubizFormMounted } = globalSlice.actions
export default globalSlice.reducer

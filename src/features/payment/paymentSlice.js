import { createSlice } from '@reduxjs/toolkit'

export const paymentSlice = createSlice({
  name: 'paymentActions',
  initialState: {
    amountToPay: null,
  },
  reducers: {
    setAmountToPay: (state, action) => {
      state.amountToPay = action.payload
    },
  },
})

export const { setAmountToPay } = paymentSlice.actions
export default paymentSlice.reducer
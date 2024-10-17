import { createSlice } from '@reduxjs/toolkit'

export const paymentSlice = createSlice({
  name: 'paymentActions',
  initialState: {
    amountToPay: null,
    userId: null,
    opportunityId: null,
    acquisitionType: null
  },
  reducers: {
    setAmountToPay: (state, action) => {
      state.amountToPay = action.payload
    },
    setPayerUserId: (state, action) => {
      state.userId = action.payload
    },
    setPayerOpportunityId: (state, action) => {
      state.opportunityId = action.payload
    },
    setAcquisitionType: (state, action) => {
      state.acquisitionType = action.payload
    }
  },
})

export const { setAmountToPay, setPayerUserId, setPayerOpportunityId } = paymentSlice.actions
export default paymentSlice.reducer
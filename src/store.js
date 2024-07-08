import { configureStore } from '@reduxjs/toolkit';
import sessionSlice from './features/payment/sessionSlice';
import globalSlice from './features/globals/globalSlice';
import paymentSlice from './features/payment/paymentSlice';

export const store = configureStore({
    reducer: {
        session: sessionSlice,
        global: globalSlice,
        payment: paymentSlice
    },
});

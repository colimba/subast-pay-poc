import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'sessionToken',
    initialState: {
        status: 'idle',
        token: null
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
});

export const { setStatus, setToken } = sessionSlice.actions;
export default sessionSlice.reducer;

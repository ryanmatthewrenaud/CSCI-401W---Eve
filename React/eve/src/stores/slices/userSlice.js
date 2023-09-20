import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userID: null,
    username: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {

            state.username = action.payload.username;
            state.userID = action.payload.user_id;

            localStorage.setItem('userID', action.payload.user_id);
            localStorage.setItem('username', action.payload.username);

        },
        logout: (state) => {
            state = initialState;
            localStorage.clear();
        }

    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
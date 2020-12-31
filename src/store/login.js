import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const { reducer, actions } = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    userLoggedIn: (user, action) => {
      const { id, firstName, lastName, phone, address, email } = action.payload;
      user.id = id;
      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;
      user.address = address;
      user.email = email;
    },
    userLoggedOut: (user, action) => user = {}
  }
});

export const { userLoggedIn, userLoggedOut } = actions;

export default reducer;

export const getLoggedInUserDetails = createSelector(
  state => state.login,
  login => login
);
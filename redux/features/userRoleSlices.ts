// userRolesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userRolesSlice = createSlice({
  name: 'userRoles',
  initialState: {
    role: null,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = userRolesSlice.actions;
export default userRolesSlice.reducer;

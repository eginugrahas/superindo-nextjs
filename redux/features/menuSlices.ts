// menuPermissionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuAccessSlice = createSlice({
  name: 'menuAccess',
  initialState: {
    menu: "home"
  },
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload
    },
  },
});

export const {setMenu} = menuAccessSlice.actions
export default menuAccessSlice.reducer;

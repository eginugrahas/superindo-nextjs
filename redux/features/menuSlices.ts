// menuPermissionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuAccessSlice = createSlice({
  name: 'menuAccess',
  initialState: {
    operator: {
      dashboardAccess: true,
      masterDataAccess: true,
      transactionsAccess: true
    },
    customer: {
      canAccessDashboard: false,
      masterDataAccess: false,
      transactionsAccess: true
    },
  },
  reducers: {
    // Add actions to update menu permissions if necessary
  },
});

export default menuAccessSlice.reducer;

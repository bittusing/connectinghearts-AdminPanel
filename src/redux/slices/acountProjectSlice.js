import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountId: [],
  projectId: [],
};

export const accountProjectSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addSelectedAccount: (state, action) => {
      state.accountId = action.payload;
    },
    addSelectedProject: (state, action) => {
      state.projectId = action.payload;
    },
    clearProjects: (state, action) => {
      state.projectId = action.payload;
    },
  },
});

export const { addSelectedAccount, addSelectedProject, clearProjects } =
  accountProjectSlice.actions;

export default accountProjectSlice.reducer;

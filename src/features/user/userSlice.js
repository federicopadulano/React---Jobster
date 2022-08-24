import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localstorage";
import {
  clearStoreThunk,
  updateUserThunk,
  userLoginThunk,
  userRegisterThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  user: getFromLocalStorage(),
  isSidebarOpen: false,
};

export const userRegister = createAsyncThunk(
  "user/Register",
  userRegisterThunk
);

export const userLogin = createAsyncThunk("user/Login", userLoginThunk);

export const updateUser = createAsyncThunk("user/updateUser", updateUserThunk);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeFromLocalStorage();
    },
  },
  extraReducers: {
    [userRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { user } = action.payload;
      state.user = user;
      addToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    },
    [userRegister.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { user } = action.payload;
      state.user = user;
      addToLocalStorage(user);
      toast.success(`Welcome back ${user.name}`);
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.user = user;
      addToLocalStorage(user);
      toast.success("User updated!");
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [clearStore.rejected]: () => {
      toast.error("There was an error");
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;

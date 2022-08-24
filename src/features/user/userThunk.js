import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

export const userRegisterThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/register", user);

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const userLoginThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch("/auth/updateUser", user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser());
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    // console.log(error);
    return Promise.reject();
  }
};

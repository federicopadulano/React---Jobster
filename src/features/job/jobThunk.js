import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.rejectWithValue("Unauthorized!");
      thunkAPI.dispatch(logoutUser());
    }
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(getAllJobs());

    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

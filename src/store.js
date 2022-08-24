import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";

import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});

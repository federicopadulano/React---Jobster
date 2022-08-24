import React from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "../../features/job/jobSlice";
import { toast } from "react-toastify";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleChangeJob = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChangeJob}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChangeJob}
          />
          {/* jobLocation */}
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleChangeJob}
            labelText="job location"
          />

          {/* FormRowSelect Status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleChangeJob}
            list={statusOptions}
          />

          {/* FormRowSelect Job Type */}
          <FormRowSelect
            name="jobType"
            value={jobType}
            handleChange={handleChangeJob}
            list={jobTypeOptions}
            labelText="Job Type"
          />

          {/* button container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button className="btn btn-block submit-btn" onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;

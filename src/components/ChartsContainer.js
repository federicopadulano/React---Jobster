import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
  const [areaChart, setAreaChart] = useState(true);
  const { monthlyApplications: data } = useSelector((state) => state.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button onClick={() => setAreaChart(!areaChart)}>
        {areaChart ? "Bar Chart" : "Area Chart"}
      </button>
      {areaChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;

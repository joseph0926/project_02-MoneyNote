import React, { useState } from "react";
import { useSelector } from "react-redux";

import BarChartComponent from "./BarChartComponent";
import AreaChartComponent from "./AreaChartComponent";

import styled from "styled-components";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((state) => state.expense);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      <div className="chart">{barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}</div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }

  @media only screen and (max-width: 620px) {
    .chart {
      width: 90vw;
    }
  }
`;

export default ChartsContainer;

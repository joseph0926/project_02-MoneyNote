import React, { useState } from "react";
import { useSelector } from "react-redux";

import BarChartComponent from "./BarChartComponent";
import AreaChartComponent from "./AreaChartComponent";

import styled from "styled-components";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const [twoChart, setTwoChart] = useState("");
  const { monthlyApplications: data } = useSelector((state) => state.expense);

  const onTwoChart = () => {
    setTwoChart("big");
  };

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        type="button"
        onClick={() => setBarChart(!barChart)}
        className="chart-btn sm"
      >
        {barChart ? "Bar Chart" : "Area Chart"}
      </button>
      <button type="button" className="chart-btn lg">
        Charts
      </button>
      <div className="chart sm">
        {barChart ? (
          <BarChartComponent data={data} />
        ) : (
          <AreaChartComponent data={data} />
        )}
      </div>
      <div className="chart lg">
        <BarChartComponent data={data} />
        <AreaChartComponent data={data} />
      </div>
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
  .chart-btn {
    border: 2px solid;
    padding: 1rem 2rem;
  }
  .lg {
    display: none;
  }

  @media only screen and (max-width: 620px) {
    .chart {
      width: 90vw;
    }
  }
  @media only screen and (min-width: 1921px) {
    button {
      width: 100%;
      text-align: center;
    }
    .sm {
      display: none;
    }
    .lg {
      display: block;
    }
  }
`;

export default ChartsContainer;

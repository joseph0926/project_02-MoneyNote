import React from "react";
import { useSelector } from "react-redux";

import StatItem from "./StatItem";

import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import styled from "styled-components";

const StatsContainer = () => {
  const { stats } = useSelector((state) => state.expense);
  const defaultStats = [
    {
      title: "지출 내역",
      count: stats.totalExpense || 0,
      icon: <FaSuitcaseRolling />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
    {
      title: "지출 금액",
      count: stats.totalExpenseAmount + "원" || 0 + "원",
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
`;

export default StatsContainer;

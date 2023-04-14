import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showStats } from "../../store/money/expense-slice";
import Loading from "../UI/Loading";
import StatsContainer from "../Filter/StatsContainer";
import ChartsContainer from "../Filter/ChartsContainer";

const Stats = () => {
  const dispatchFn = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (state) => state.expense
  );
  useEffect(() => {
    dispatchFn(showStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;

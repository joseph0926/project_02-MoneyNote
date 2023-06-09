import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import Expense from "./Expense";
import Loading from "../UI/Loading";
import { getAllExpenses } from "../../store/money/expense-slice";

import styled from "styled-components";
import SearchContainer from "../Filter/SearchContainer.jsx";

const Money = () => {
  const dispatchFn = useDispatch();
  const { isLoading, expenses, search, searchStatus, searchType, sort } =
    useSelector((state) => state.expense);

  useEffect(() => {
    dispatchFn(getAllExpenses());
  }, [search, searchStatus, searchType, sort]);

  if (isLoading) {
    return (
      <>
        <Loading />
        <Outlet />
      </>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <Wrapper style={{ height: "100%" }}>
        <Outlet />
        <SearchContainer />
        <h2>아직 추가된 비용이 없습니다</h2>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <SearchContainer />
        {/* <Outlet /> */}
        <h2>All Expense</h2>
        <div className="expenses">
          {expenses.map((expense) => {
            return <Expense key={expense._id} {...expense} />;
          })}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  padding-top: 4rem;
  border-left: 2px solid;
  h2 {
    text-transform: none;
    margin: 3rem 2.5rem;
  }
  .expenses {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    justify-content: center;
  }
  @media (min-width: 992px) {
    .expenses {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default Money;

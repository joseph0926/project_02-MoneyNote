import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import Expense from "./Expense";
import Loading from "../UI/Loading";
import { getAllExpenses } from "../../store/money/expense-slice";

import styled from "styled-components";

const Money = () => {
  const dispatchFn = useDispatch();
  const { isLoading, expenses } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatchFn(getAllExpenses());
  }, []);

  if (isLoading) {
    return (
      <>
        <Outlet />
        <Loading />
      </>
    );
  }

  if (expenses.length === 0) {
    return (
      <Wrapper>
        <Outlet />
        <h2>아직 추가된 비용이 없습니다</h2>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <Outlet />
        <h5>All Expense</h5>
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
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .expenses {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
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

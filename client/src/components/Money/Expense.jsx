import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import ExpenseInfo from "./ExpenseInfo";

import { FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import styled from "styled-components";

const Expense = ({
  _id,
  title,
  description,
  expensesType,
  status,
  createdAt,
  expenseAmount,
}) => {
  const dispatchFn = useDispatch();
  const date = moment(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          <MdAttachMoney />
        </div>
        <div className="info">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ExpenseInfo icon={<FaCalendarAlt />} text={date} />
          <ExpenseInfo icon={<FaMoneyBill />} text={expensesType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="add-money"
              className="btn edit-btn"
              onClick={() => {
                // dispatchFn(setEditJob({ editJobId: _id, position, company, jobLocation, jobType, status }));
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                // dispatchFn(deleteJob());
              }}
            >
              Delete
            </button>
          </div>
          <div>
            <FaMoneyBill />
            <span>지출금액: </span>
            {expenseAmount}원
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  border: 2px solid;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr auto;
  margin: 0 2.5rem 2rem;

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-gray);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--color-blue-pri);
    border-radius: 6px;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 2rem;
    svg {
      color: var(--color-white);
    }
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--color-gray);
    }
  }
  .지출예정 {
    color: #647acb;
    border: 2px solid #647acb;
  }
  .지출 {
    color: #d66a6a;
    border: 2px solid #d66a6a;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: 10px;
    text-transform: capitalize;
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 8.2rem;

    svg {
      font-size: 1.25rem;
      margin-right: 1rem;
    }
  }
  .edit-btn,
  .delete-btn {
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
  .delete-btn {
    background: red;
  }
`;

export default Expense;

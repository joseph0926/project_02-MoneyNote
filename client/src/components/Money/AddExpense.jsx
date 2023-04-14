import React from "react";
import { useDispatch, useSelector } from "react-redux";

import InputHelper from "../Helpers/InputHelper";
import InputSelectorHelper from "../Helpers/InputSelectorHelper";
import { changeHandler, clearHandler, createExpense } from "../../store/money/expense-slice";

import styled from "styled-components";

const AddExpense = () => {
  const dispatchFn = useDispatch();
  const { isLoading, isEditing, title, description, status, statusOptions, expenseType, expenseTypeOptions } = useSelector(
    (state) => state.expense
  );

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatchFn(changeHandler({ name, value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("입력칸을 비울수 없습니다.");
      return;
    }

    dispatchFn(createExpense({ title, description, status, expenseType }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>{isEditing ? "edit expense" : "add expense"}</h3>

        <div className="form-center">
          <InputHelper type="text" name="title" labelText="지출내용" value={title} handleChange={inputHandler} />
          <InputHelper type="text" name="description" labelText="지출설명" value={description} handleChange={inputHandler} />

          <InputSelectorHelper name="status" value={status} handleChange={inputHandler} list={statusOptions} />

          <InputSelectorHelper
            name="expenseType"
            labelText="expense type"
            value={expenseType}
            handleChange={inputHandler}
            list={expenseTypeOptions}
          />

          <div className="btn-container">
            <button type="button" className="btn btn-block clear-btn" onClick={() => dispatchFn(clearHandler())}>
              clear
            </button>
            <button type="submit" className="btn btn-block submit-btn" disabled={isLoading}>
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: 10px;
  width: 100%;
  border-bottom: 2px solid;
  padding: 0rem 2rem 4rem;
  h3 {
    text-transform: capitalize;
    margin-top: -1rem;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--color-gray);
  }
  .clear-btn:hover {
    background: var(--color-dark);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default AddExpense;

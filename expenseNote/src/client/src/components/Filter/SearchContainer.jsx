import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputHelper from "../Helpers/InputHelper.jsx";
import InputSelectorHelper from "../Helpers/InputSelectorHelper.jsx";

import styled from "styled-components";
import {
  changeHandler,
  clearFilters,
} from "../../store/money/expense-slice.jsx";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");

  const dispatchFn = useDispatch();
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    expensesTypeOptions,
    statusOptions,
  } = useSelector((state) => state.expense);

  const clear = () => {
    dispatchFn(clearFilters());
    dispatchFn(getAllExpenses());
  };

  const searchHandler = (e) => {
    if (isLoading) return;
    dispatchFn(changeHandler({ name: e.target.name, value: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLocalSearch("");
    clear();
  };

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatchFn(
          changeHandler({ name: e.target.name, value: e.target.value })
        );
      }, 1000);
    };
  };
  const optimizedDebounced = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>search form</h3>
        <div className="form-center">
          <InputHelper
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounced}
          />
          <InputSelectorHelper
            labelText="지출상태"
            name="searchStatus"
            value={searchStatus}
            handleChange={searchHandler}
            list={["all", ...statusOptions]}
          />
          <InputSelectorHelper
            labelText="지출종류"
            name="searchType"
            value={searchType}
            handleChange={searchHandler}
            list={["all", ...expensesTypeOptions]}
          />
          <InputSelectorHelper
            name="sort"
            value={sort}
            handleChange={searchHandler}
            list={sortOptions}
          />
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default SearchContainer;

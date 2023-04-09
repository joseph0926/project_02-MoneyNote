import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { useDispatch, useSelector } from "@reduxjs/toolkit";
import InputHelper from "../Helpers/InputHelper";
import { toast } from "react-toastify";

import styled from "styled-components";

const initialState = {
  name: "",
  email: "",
  password: "",
  isSign: true,
};

const AuthForm = () => {
  const dispatchFn = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { values, valueChangeHandler, reset } = useInput(initialState);

  const submitHandler = (e) => {
    e.preventDefalut();

    const { email, password, name, isMode } = values;
    if (!email || !password || (!isMode && !name)) {
      toast.error("입력값이 유효하지 않습니다. 다시 입력해주세요.");
      return;
    }
    if (isMode) {
      dispatchFn(login({ email, password }));
      return;
    }
    dispatchFn(signup({ name, email, password }));

    reset();
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>{values.isSign ? "로그인" : "회원가입"}</h3>

        {!values.isSign && (
          <InputHelper
            type="text"
            name="name"
            value={values.name}
            handleChange={valueChangeHandler}
          />
        )}
        <InputHelper
          type="email"
          name="email"
          value={values.email}
          handleChange={valueChangeHandler}
        />
        <InputHelper
          type="password"
          name="password"
          value={values.password}
          handleChange={valueChangeHandler}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading,,," : "submit"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  .form {
    width: 300px;
  }
  h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
  .btn {
    margin-top: 1rem;
  }
`;

export default AuthForm;

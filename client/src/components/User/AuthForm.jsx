import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import InputHelper from "../Helpers/InputHelper";
import { toast } from "react-toastify";
import { login, signup } from "../../store/user/user-slice";

import styled from "styled-components";

const initialState = {
  name: "",
  email: "",
  password: "",
  goal: "",
  description: "",
};

const AuthForm = ({ isSign }) => {
  const dispatchFn = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  const [showExtra, setShowExtra] = useState(false);

  const navigate = useNavigate();

  const { values, valueChangeHandler, valueInputBlurHandler, reset } = useInput(initialState);

  const showExtraHandler = () => {
    setShowExtra(!showExtra);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { email, password, name, goal, description } = values;
    if (!email || !password || (!isSign && !name)) {
      toast.error("입력값이 유효하지 않습니다. 다시 입력해주세요.");
      return;
    }

    if (isSign) {
      dispatchFn(login({ email, password }));
      return;
    }
    dispatchFn(signup({ name, email, password, goal, description }));

    // reset();
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      // toast.warn("이미 로그인중입니다.");
    }
  }, [user]);

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>{isSign ? "로그인" : "회원가입"}</h3>

        {!isSign && (
          <InputHelper type="text" name="name" value={values.name} handleChange={valueChangeHandler} handleBluer={valueInputBlurHandler} />
        )}
        <InputHelper type="email" name="email" value={values.email} handleChange={valueChangeHandler} handleBluer={valueInputBlurHandler} />
        <InputHelper
          type="password"
          name="password"
          value={values.password}
          handleChange={valueChangeHandler}
          handleBluer={valueInputBlurHandler}
        />
        {!isSign && (
          <button type="button" className="btn btn-extra" onClick={showExtraHandler}>
            추가 정보 입력하기
          </button>
        )}

        {!isSign && showExtra && <InputHelper type="text" name="goal" value={values.goal} handleChange={valueChangeHandler} />}
        {!isSign && showExtra && (
          <InputHelper type="text" name="description" value={values.description} handleChange={valueChangeHandler} />
        )}

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
  .btn-extra {
    margin-left: 10rem;
    margin-bottom: 1rem;
    background: var(--color-blue-op);
  }
`;

export default AuthForm;

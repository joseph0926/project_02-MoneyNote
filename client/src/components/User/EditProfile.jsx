import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputHelper from "../Helpers/InputHelper";
import { updatePassword, updateUser } from "../../store/user/user-slice";
import { toast } from "react-toastify";

import styled from "styled-components";

const EditProfile = () => {
  const dispatchFn = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    name: user?.name || "",
    goal: user?.goal || "",
    description: user?.description || "",
  });
  const [password, setPassword] = useState({
    currPassword: "",
    newPassword: "",
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { name, goal, description } = userData;
    if (!name) {
      toast.error("이름을 비울수는 없습니다.");
      return;
    }
    dispatchFn(updateUser({ name, goal, description }));
  };

  const inputHandler2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPassword({ ...password, [name]: value });
  };

  const submitHandler2 = (e) => {
    e.preventDefault();

    const { currPassword, newPassword } = password;
    if (!currPassword || !newPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    dispatchFn(updatePassword({ currPassword, newPassword }));
  };

  return (
    <Wrapper>
      <h2>{user?.name || ""}님의 페이지입니다</h2>
      <form className="form" onSubmit={submitHandler}>
        <h3>개인정보 수정</h3>
        <div className="form-center">
          <InputHelper
            type="text"
            name="name"
            value={userData.name}
            handleChange={inputHandler}
          />
          <InputHelper
            type="text"
            name="goal"
            value={userData.goal}
            handleChange={inputHandler}
          />
          <InputHelper
            type="text"
            name="description"
            value={userData.description}
            handleChange={inputHandler}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "loading,,," : "save changes"}
          </button>
        </div>
      </form>
      <form className="form-password" onSubmit={submitHandler2}>
        <h3>비밀번호 수정</h3>
        <div className="form-center">
          <InputHelper
            type="password"
            name="currPassword"
            value={password.currPassword}
            handleChange={inputHandler2}
          />
          <InputHelper
            type="password"
            name="newPassword"
            value={password.newPassword}
            handleChange={inputHandler2}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "loading,,," : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 10px;
  height: 100%;
  width: 100%;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px;
  h2 {
    text-transform: capitalize;
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 1.5rem;
  }
  .form,
  .form-password {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-password {
    margin-top: 3rem;
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
  .clear-btn:hover {
    background: var(--color-blue);
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

export default EditProfile;

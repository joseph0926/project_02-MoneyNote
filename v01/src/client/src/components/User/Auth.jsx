import React, { useState } from "react";

import AuthForm from "./AuthForm";

import styled from "styled-components";

const Auth = () => {
  const [formBoxActvie, setFormBoxActvie] = useState(false);
  const [isSign, setIsSign] = useState(true);
  const activeHandler = () => {
    setFormBoxActvie(true);
    setIsSign(false);
  };
  const inactiveHandler = () => {
    setFormBoxActvie(false);
    setIsSign(true);
  };

  return (
    <Wrapper>
      <div className="sign-content">
        <div className="sign-header">
          <h2>이미 회원이시라면, 로그인해주세요!</h2>
          <button className="sign-btn" onClick={inactiveHandler}>
            로그인
          </button>
        </div>
        <div className="sign-header">
          <h2>회원이 아니신가요? 회원가입해주세요!</h2>
          <button className="sign-btn" onClick={activeHandler}>
            회원가입
          </button>
        </div>
      </div>
      <div className={`${formBoxActvie ? "sign-formBox active" : "sign-formBox"}`}>
        <AuthForm isSign={isSign} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 800px;
  height: 500px;
  margin: 5rem auto;
  .sign-content {
    position: absolute;
    top: 40px;
    width: 100%;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-white);
    box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
  }
  .sign-header {
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .sign-header h2 {
    color: var(--color-gray-400);
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .sign-btn {
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    background: var(--color-blue-op);
    color: var(--color-dark);
    font-weight: 500;
    font-size: 1.1rem;
    margin-top: 1rem;
    transition: all 0.3s;
  }
  .sign-btn:hover {
    background: var(--color-blue);
    color: var(--color-white);
  }
  .sign-formBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    min-height: 100%;
    padding: 2rem;
    background: var(--color-dark);
    color: var(--color-white);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease-in-out;
  }
  .sign-formBox.active {
    left: 50%;
  }

  @media (max-width: 800px) {
    .sign-content {
      position: absolute;
      top: 0;
      width: 420px;
      height: 900px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .sign-formBox.active {
      top: 70%;
      left: 0;
    }
  }
`;

export default Auth;

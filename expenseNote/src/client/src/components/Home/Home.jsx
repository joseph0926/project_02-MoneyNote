import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <div className="text">
        <div className="text-inner bottom">
          <Link to="/auth">GettingStart</Link>
          <Link to="/auth" className="auth">
            로그인 / 회원가입
          </Link>
        </div>
        <span className="text-inner top">ExpenseNote</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #a0a0a0;
  transition: all 0.5s ease-in-out;

  &:has(.top:hover) {
    background: #000;
  }
  &:has(.bottom:hover + .top) {
    background: #fff;
  }

  .text {
    position: relative;
    font-size: 10rem;
  }

  .text-inner {
    position: absolute;
    background: #a0a0a0;
    transform: translate(-50%, -50%);
  }

  .top {
    color: #fff;
    z-index: 2;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
    transition: all 0.5s ease-in-out;
    padding: 2rem 0;
  }
  .top:hover {
    background: #000;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background: transparent;
    transition: all 0.5s ease-in-out;
  }
  .bottom:hover {
    background: #fff;
  }
  .bottom:hover + .top {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }

  .auth {
    font-size: 2rem;
    color: #000;
  }

  @media only screen and (max-width: 900px) {
    .text {
      position: relative;
      font-size: 5rem;
    }
    .text-inner {
      position: absolute;
      background: #a0a0a0;
      transform: translate(-50%, -50%);
    }
    .top {
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 90%);
    }
    .bottom {
      margin: 1rem 0;
      align-items: center;
    }
  }
  @media only screen and (max-width: 520px) {
    .text {
      font-size: 3rem;
    }
  }
`;

export default Home;

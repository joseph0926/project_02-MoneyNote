import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Home = () => {
  const [con, setCon] = useState("con");
  return (
    <Wrapper>
      <div className="text">
        <Link
          to="/auth"
          className="text-inner bottom"
          // onMouseOver={(e) => {
          //   e.relatedTarget.style.backgroundColor = "#fff";
          //   e.target.style.backgroundColor = "#fff";
          // }}
          // onMouseLeave={(e) => {
          //   e.relatedTarget.style.backgroundColor = "#a0a0a0";
          //   e.target.style.backgroundColor = "#a0a0a0";
          // }}
        >
          GettingStart
        </Link>
        <span
          className="text-inner top"
          // onMouseOver={(e) => {
          //   e.relatedTarget.style.backgroundColor = "#000";
          //   e.target.style.backgroundColor = "#000";
          // }}
          // onMouseLeave={(e) => {
          //   e.relatedTarget.style.backgroundColor = "#a0a0a0";
          //   e.target.style.backgroundColor = "#a0a0a0";
          // }}
        >
          ExpenseNote
        </span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  }
  .top:hover {
    background: #000;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  .bottom {
    transition: all 0.5s ease-in-out;
  }
  .bottom:hover {
    background: #fff;
  }
  .bottom:hover + .top {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
`;

export default Home;

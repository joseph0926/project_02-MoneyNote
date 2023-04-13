import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <div className="text">
        <span
          className="text-inner bottom"
          onMouseOver={(e) => {
            e.relatedTarget.style.backgroundColor = "#fff";
            e.target.style.backgroundColor = "#fff";
          }}
          onMouseOut={(e) => {
            e.relatedTarget.style.backgroundColor = "#a0a0a0";
            e.target.style.backgroundColor = "#a0a0a0";
          }}
        >
          Expense
        </span>
        <span
          className="text-inner top"
          onMouseOver={(e) => {
            e.relatedTarget.style.backgroundColor = "#000";
            e.target.style.backgroundColor = "#000";
          }}
          onMouseOut={(e) => {
            e.relatedTarget.style.backgroundColor = "#a0a0a0";
            e.target.style.backgroundColor = "#a0a0a0";
          }}
        >
          Tracking
        </span>
      </div>
      <Link to="/auth" className="btn">
        Sign-in / Sign-up
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #a0a0a0;
  transition: all 0.5s ease-in-out;

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
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 110%);
    transition: all 0.5s ease-in-out;
  }
  .top:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 110%);
  }

  .bottom:hover + .top {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }

  .btn {
    position: absolute;
    top: 10%;
    left: auto;
    padding: 1rem 2rem;
    background: #fff;
    color: #000;
    font-size: 1.2rem;
    font-weight: 700;
    z-index: 5;
    transition: all 0.5s ease-in-out;
  }
  .btn:hover {
    background: #000;
    color: #fff;
  }
`;

export default Home;

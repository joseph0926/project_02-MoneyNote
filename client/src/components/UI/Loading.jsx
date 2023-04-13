import React from "react";

import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <div className="loading-ring"></div>
      <div className="loading-text">loading...</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;

  .loading-ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    animation: ring 2s linear infinite;
    overflow: hidden;
  }
  .loading-ring::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  .loading-text {
    color: #737373;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 200px;
    animation: loadingText 3s ease-in-out infinite;
  }
  @keyframes ring {
    0% {
      transform: rotate(0deg);
      box-shadow: 1px 5px 2px #00d3e6;
    }
    50% {
      transform: rotate(180deg);
      box-shadow: 1px 5px 2px #00b4e6;
    }
    100% {
      transform: rotate(360deg);
      box-shadow: 1px 5px 2px #005ce6;
    }
  }
  @keyframes loadingText {
    50% {
      color: black;
    }
  }
`;

export default Loading;

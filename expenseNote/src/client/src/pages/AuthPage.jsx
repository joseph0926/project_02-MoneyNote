import React from "react";
import Auth from "../components/User/Auth";

import styled from "styled-components";

const AuthPage = () => {
  return (
    <Wrapper>
      <Auth />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default AuthPage;

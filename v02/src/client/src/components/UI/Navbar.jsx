import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar, toggleTheme } from "../../store/ui/ui-slice";

import { FiMenu, FiMoon, FiSun, FiLogOut, FiUserPlus } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { logout } from "../../store/user/user-slice";
import { getUserFromLocalStorage } from "../Helpers/localStorage";

const Navbar = () => {
  const dispatchFn = useDispatch();
  const { isSidebarOpen, isLight } = useSelector((state) => state.ui);
  const token = getUserFromLocalStorage();

  return (
    <Wrapper>
      <div className="container">
        <button type="button" className="toggle-btn" onClick={() => dispatchFn(toggleSidebar())}>
          {!isSidebarOpen && <FiMenu />}
          {isSidebarOpen && <AiOutlineClose />}
        </button>
        <div className="logo">
          <Link to="/">
            <h1>Logo</h1>
          </Link>
          <h3>MoneyNote</h3>
        </div>
        <div className="btn-container">
          <div className="sign-btn">
            {!token && (
              <Link to="auth">
                <FiUserPlus />
              </Link>
            )}
            {token && (
              <Link to="/land" onClick={() => dispatchFn(logout("성공적으로 로그아웃 되셨습니다."))}>
                <FiLogOut />
              </Link>
            )}
          </div>
          <div className="dark-mode" onClick={() => dispatchFn(toggleTheme())}>
            {isLight && <FiMoon />}
            {!isLight && <FiSun />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 0px 0px;
  .container {
    display: flex;
    width: 90vw;
    justify-content: space-between;
    align-items: center;
    padding-left: 10rem;
  }
  .toggle-btn {
    font-size: 1.5rem;
    display: none;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .logo {
    h1 {
      font-size: 2rem;
    }
    h3 {
      display: none;
      margin: 0;
    }
  }
  .btn-container {
    display: flex;
    width: 20%;
    gap: 8%;
  }
  .sign-btn {
    svg {
      font-size: 1.75rem;
    }
  }
  .dark-mode {
    cursor: pointer;
    svg {
      font-size: 1.75rem;
    }
  }

  @media (max-width: 992px) {
    height: 4rem;
    width: 100vw;
    .container {
      padding: 0;
      padding-left: 2rem;
    }
  }
  @media (max-width: 760px) {
    height: 3rem;
    width: 100vw;
    .container {
      width: 100vw;
      padding: 0;
      padding-left: 2rem;
    }
    .toggle-btn {
      display: flex;
    }
  }
  @media (max-width: 420px) {
    .container {
      padding-left: 0.5rem;
    }
  }
`;

export default Navbar;

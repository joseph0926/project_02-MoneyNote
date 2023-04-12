import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar, toggleTheme } from "../../store/ui/ui-slice";

import { FiMenu, FiMoon, FiSun, FiUserMinus, FiUserPlus } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { logout } from "../../store/user/user-slice";

const Navbar = () => {
  const dispatchFn = useDispatch();
  const { isSidebarOpen, isLight } = useSelector((state) => state.ui);
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <div className="container">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatchFn(toggleSidebar())}
        >
          {!isSidebarOpen && <FiMenu />}
          {isSidebarOpen && <AiOutlineClose />}
        </button>
        <div className="logo">
          <h1>Logo</h1>
          <h3>MoneyNote</h3>
        </div>
        <div className="btn-container">
          <div className="sign-btn">
            {!isLoggedIn && (
              <Link to="auth">
                <FiUserPlus />
              </Link>
            )}
            {isLoggedIn && (
              <Link
                to="/"
                onClick={() =>
                  dispatchFn(logout("성공적으로 로그아웃 되셨습니다."))
                }
              >
                <FiUserMinus />
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
    .toggle-btn {
      display: flex;
    }
  }
`;

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiUserPlus, FiUserMinus, FiSettings } from "react-icons/fi";
import styled from "styled-components";
import { logout } from "../../store/user/user-slice";

const moneyMenu = [
  { name: "All Money", route: "/money" },
  { name: "Add Money", route: "/money/add-money" },
];
const sideMenu = [
  { name: "Setting", route: "/setting", icon: <FiSettings /> },
  { name: "Logout", route: "/", icon: <FiUserMinus /> },
];

const Sidebar = () => {
  const dispatchFn = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="stats">
        <h4>Dashboard</h4>
        <Link to="/">Stats</Link>
      </div>
      <div className="money">
        <h4>Money</h4>
        <ul>
          {moneyMenu.map((menu) => {
            return (
              <li className="menu" key={menu.name}>
                <Link to={menu.route}>{menu.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="side">
        <h4>Set</h4>
        <ul>
          {isLoggedIn && (
            <li className="menu">
              <FiSettings />
              <Link to="/auth">Setting</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li className="menu">
              <FiUserPlus />
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="menu" onClick={() => dispatchFn(logout("로그아웃 되셨습니다."))}>
              <FiUserMinus />
              <Link to="/">Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 250px;
  padding-left: 1rem;
  padding-bottom: 2.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  .logo {
    display: flex;
    align-items: center;
  }
  .logo a {
    align-items: center;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 700;
  }

  .stats,
  .money {
    margin-top: 2.5rem;
    margin-left: 0.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--color-gray-pri);
  }
  .stats h4,
  .money h4,
  .side h4 {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color-dark-pri);
    margin-bottom: 1.25rem;
  }
  .stats a,
  .menu a {
    font-size: 1.25rem;
    margin-left: 0.5rem;
    color: var(--color-gray);
    transition: all 0.3s ease-in;
  }
  .stats a:hover,
  .menu:nth-child(1):hover,
  .menu:nth-child(2):hover {
    margin-left: 1rem;
  }

  .menu {
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in;
  }
  .menu:nth-child(1) {
    margin: 1.5rem 0;
  }
  .menu svg {
    font-size: 1.25rem;
    color: var(--color-gray);
    margin-left: 0.6rem;
  }

  .side {
    margin-top: 2.5rem;
    margin-left: 0.5rem;
    padding-bottom: 1.25rem;
  }
`;

export default Sidebar;

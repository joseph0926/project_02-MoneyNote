import React from "react";
import { Link } from "react-router-dom";

import { FiUser, FiSettings } from "react-icons/fi";
import styles from "./Sidebar.module.css";

const moneyMenu = [
  { name: "All Money", route: "/money" },
  { name: "Add Money", route: "/money/add-money" },
];
const sideMenu = [
  { name: "Setting", route: "/setting", icon: <FiSettings /> },
  { name: "Login", route: "/auth", icon: <FiUser /> },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">Logo</Link>
      </div>
      <div className={styles.stats}>
        <h4>Dashboard</h4>
        <Link to="/">Stats</Link>
      </div>
      <div className={styles.money}>
        <h4>Money</h4>
        <ul>
          {moneyMenu.map((menu) => {
            return (
              <li className={styles.menu} key={menu.name}>
                <Link to={menu.route}>{menu.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.side}>
        <h4>Set</h4>
        <ul>
          {sideMenu.map((menu) => {
            return (
              <li className={styles.menu} key={menu.name}>
                {menu.icon}
                <Link to={menu.route}>{menu.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

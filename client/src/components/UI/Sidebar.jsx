import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import NavLinks from "./NavLinks";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  return (
    <Wrapper>
      <div className={isSidebarOpen ? "sidebar-container " : "sidebar-container show-sidebar"}>
        <div className="content">
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    position: fixed;
    display: block;
    .sidebar-container {
      min-height: 100vh;
      width: 250px;
      margin-left: -250px;
      box-shadow: 0px 3px 7px;
      transition: all 0.5s;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      margin: 2rem 0;
      padding: 1rem 0;
      padding-left: 2.5rem;
      font-size: 1.25rem;
      text-transform: capitalize;
      transition: all 0.5s;
    }
    .nav-link:hover {
      /* background: var(--color-blue); */
      padding-left: 3rem;
      /* color: var(--color-white); */
    }
    .nav-link:hover .icon {
      color: var(--color-blue);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: all 0.5s;
    }
    .active {
      color: var(--color-blue);
    }
    .active .icon svg {
      color: var(--color-blue);
    }
  }
`;

export default Sidebar;

import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import NavLinks from "./NavLinks";

const Sidebar = () => {
  const { isSidebarOpen, theme } = useSelector((state) => state.ui);
  return (
    <Wrapper mode={theme}>
      <div className={isSidebarOpen ? "sidebar-container " : "sidebar-container show-sidebar"}>
        <div className="content">
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  position: fixed;
  display: block;
  .sidebar-container {
    min-height: 100vh;
    width: 250px;
    transition: all 0.5s;
  }
  .content {
    position: sticky;
    top: 0;
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

  @media only screen and (max-width: 620px) {
    z-index: 2;
    background: ${({ mode }) => (mode === "dark" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)")};

    .show-sidebar {
      margin-left: -250px;
    }
  }
`;

export default Sidebar;

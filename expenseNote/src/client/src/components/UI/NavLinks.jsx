import { NavLink } from "react-router-dom";
import links from "../Helpers/links";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../../store/ui/ui-slice.jsx";

const NavLinks = ({ toggleSidebar }) => {
  const dispatchFn = useDispatch();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={() => dispatchFn(closeSidebar())}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;

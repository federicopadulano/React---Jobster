import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, logoutUser } from "../features/user/userSlice";
import { clearStore } from "../features/user/userSlice";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={dropdown ? "dropdown show-dropdown" : "dropdown"}>
            <button
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore());
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

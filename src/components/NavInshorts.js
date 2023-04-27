import React from "react";
import "./NavInshorts.css";
import HamburgerDrawer from "./HamburgerDrawer";

const NavInshorts = ({ setCategory }) => {
  return (
    <div className="nav">
      
      <img
        style={{ cursor: "pointer" }}
        src="https://www.ata-it-th.com/0f4013c533d6723b454b743a7a6ba965.png"
        alt="logo"
        height="60%"
      />
      <div className="icon">
        <HamburgerDrawer setCategory={setCategory} />
      </div>
    </div>
  );
};

export default NavInshorts;

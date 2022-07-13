import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Main");
  const location = useLocation();
  return (
    <div className="header">
      <p className="logo">Tech Incubator</p>
      <div className="header-right">
        <Link to="mainpage">
          <p
            className={`${activeTab === "Main" ? "active" : ""}`}
            onClick={() => setActiveTab("Main")}
          >
            Main Page
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;

// Come back and create a header
// Header shouldn't have navigation powers

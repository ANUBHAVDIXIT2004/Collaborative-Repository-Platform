import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
  if (e.key === "Enter") {
    navigate(`/?search=${search}`);
  }
};

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt=""
          />
          <h2>Bithub</h2>
        </Link>

        <input
          type="text"
          placeholder="Search repository..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="nav-right">
        <Link to="/create">
          <button>+ New</button>
        </Link>

        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
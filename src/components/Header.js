import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
  return (
    <header className="c-site-header">
      <div className="o-container c-site-header-inner">
        <div className="c-site-header-logo">
          <img src="https://via.placeholder.com/40x40" alt="placeholder" />
        </div>
        <nav className="c-site-nav">
          <ul>
            <li>
              <NavLink to="/add-form">
                <FontAwesomeIcon icon="plus-circle" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/" exact>
                <FontAwesomeIcon icon="list-alt" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar">
                <FontAwesomeIcon icon="calendar-alt" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/todolist">
                <FontAwesomeIcon icon="check-circle" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/wishlist">
                <FontAwesomeIcon icon="heart" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/help">
                <FontAwesomeIcon icon="info-circle" />
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/imageUpload">U</NavLink>
            </li>
            <li>
              <Link to="/search">S</Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

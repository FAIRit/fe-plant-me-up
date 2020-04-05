import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <header className="c-site-header">
        <div className="o-container c-site-header-inner">
          <div className="c-site-header-logo">
            <Link to="/" exact>
              <img src="https://via.placeholder.com/40x40" alt="placeholder" />
            </Link>
          </div>
          {this.props.user ? (
            <nav className="c-site-nav">
              <ul>
                <li>
                  <NavLink to="/add-form">
                    <FontAwesomeIcon icon="plus-circle" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" exact>
                    <FontAwesomeIcon icon="leaf" />
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
              </ul>
            </nav>
          ) : (
            <nav className="c-site-nav">
              <ul>
                <li>
                  <h2>plant me up.</h2>
                </li>
                <li>
                  <NavLink to="/help">
                    <FontAwesomeIcon icon="info-circle" />
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    );
  }
}

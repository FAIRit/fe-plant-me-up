import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../components/utilities/img/logo-small.jpg";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <header className="c-site-header">
        <div className="o-container c-site-header-inner">
          {this.props.user ? (
            <>
              <Link to="/" exact>
                <div className="c-site-header-logo">
                  <img src={logo} alt="logo" />
                </div>
              </Link>
              <nav className="c-site-nav">
                <ul>
                  <li>
                    <NavLink to="/add-form" id="addForm">
                      <FontAwesomeIcon icon="plus-circle" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" exact id="catalog">
                      <FontAwesomeIcon icon="leaf" />
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/todolist" id="toDoList">
                      <FontAwesomeIcon icon="check-circle" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist" id="wishList">
                      <FontAwesomeIcon icon="heart" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/help" id="about">
                      <FontAwesomeIcon icon="info-circle" />
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <>
              <Link to="/" exact>
                <div className="c-site-header-logo">
                  <img src={logo} alt="logo" />

                  <h2>plant me up.</h2>
                </div>
              </Link>
              <nav className="c-site-nav">
                <ul>
                  <li>
                    <NavLink to="/help" id="about2">
                      <FontAwesomeIcon icon="info-circle" />
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </header>
    );
  }
}

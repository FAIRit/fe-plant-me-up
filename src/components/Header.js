import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Header = () => {
    
    return (
        <header className="c-site-header">
            <div className="o-container c-site-header-inner">
                <div className="c-site-header-logo">
                <img src="https://via.placeholder.com/40x40" alt="placeholder" />
                </div>
                <nav className="c-site-nav">
                    <ul>
                        <li><NavLink to="/add-form">+</NavLink></li>
                        <li><NavLink to="/" exact>Cat</NavLink></li>
                        <li><NavLink to="/calendar">Cal</NavLink></li>
                        <li><NavLink to="/todolist">Todo</NavLink></li>
                        <li><NavLink to="/wishlist">Wish</NavLink></li>
                        <li><NavLink to="/help">i</NavLink></li>
                        <li><Link to="/search">S</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
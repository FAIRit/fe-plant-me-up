import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom'; 

export const Header = () => {
    // console.log("render");
    return (
        <header className="c-site-header">
            <h1>logo</h1>
            <nav>
                <ul>
                    <li><Link to="/add-form">+</Link></li>
                    <li><Link to="/">Cat</Link></li>
                    <li><Link to="/calendar">Cal</Link></li>
                    <li><Link to="/todolist">Todo</Link></li>
                    <li><Link to="/wishlist">wish</Link></li>
                </ul>
            </nav>
        </header>
    );
}
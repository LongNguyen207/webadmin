import React from 'react';
import { Link } from "react-router-dom";

class Menu extends React.Component {
    render() {
        return (
            <div className="menu-container">
                <div className="menu">
                    <Link to="/">
                        <i className="fa fa-home" aria-hidden="true"></i>
                    Home
                        </Link>
                </div>
            </div>
        );
    }
}

export default Menu;
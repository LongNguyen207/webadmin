import React from 'react';
import { Link } from "react-router-dom";

class MenuNav extends React.Component {
    render() {
        return (
            <div className="menu-nav-container">
                <ul className="menu-nav">
                    <li className="nav-item">
                        <Link to="/admin">
                            <i className="fa fa-home" aria-hidden="true"></i>
                        Trang chủ Admin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/product">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                        Quản lý sản phẩm
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user">
                            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                        Quản lý khách hàng
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/order">
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        Quản lý đơn hàng
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default MenuNav;
import React from 'react';
import MenuNav from './../../components/Menu-Nav/index';
import Menu from './../../components/Menu/index';
import TableProduct from '../../components/Table-Product/index';
import BannerHome from './../../components/Banner-Home/banner-home';
import { Switch, Route } from "react-router-dom";
import AddProduct from './../../components/Add-Product/index';
import TableUser from './../../components/Table-User/index';
import AddUser from '../../components/Add-User';
import TableOrder from './../../components/Table-Order/index';
import AddOrder from './../../components/Add-Order/index';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="home-menu-nav">
                    <MenuNav />
                </div>
                <div className="home-menu">
                    <Menu />
                    <Switch >
                        <Route exact path="/">
                            <BannerHome image="https://www.uptoyou-eg.com/images/welcome.png" />
                        </Route>
                        <Route path="/admin">
                            <BannerHome image="https://st.quantrimang.com/photos/image/2019/06/24/admin-1.jpg" />
                        </Route>
                        <Route path="/product">
                            <TableProduct />
                        </Route>
                        <Route exact path="/add-product">
                            <AddProduct />
                        </Route>
                        <Route exact path="/add-product/:id/edit">
                            {({ match }) => <AddProduct match={match} />}
                        </Route>
                        <Route path="/user">
                            <TableUser />
                        </Route>
                        <Route exact path="/add-user">
                            <AddUser />
                        </Route>
                        <Route exact path="/add-user/:id/edit">
                            {({ match }) => <AddUser match={match} />}
                        </Route>
                        <Route path="/order">
                            <TableOrder />
                        </Route>
                        <Route exact path="/add-order">
                            <AddOrder />
                        </Route>
                        <Route exact path="/add-order/:id/edit">
                            {({ match }) => <AddOrder match={match} />}
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Home;
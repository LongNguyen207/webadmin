import React from 'react';
import handleAPIsProducts from './../../apis/apiProducts';
import Search from './../Search/index';

class TableShowProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            keyword: ''
        }
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }
    componentDidMount() {
        handleAPIsProducts('GET', null, []).then(data => {
            console.log(data.data);
            this.setState(
                { products: data.data }
            )
        })
    }
    render() {
        var a = this.state.products;
        var keyword = this.state.keyword;
        var dataFilter = a.filter(function (a) {
            return a.title === keyword;
        })
        console.log(dataFilter)
        return (
            <div className="search-container">
                <div className="search">
                    <Search onSearch={this.onSearch} />
                </div>
                <div className="table-container">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Size</th>
                                <th>Số Lượng</th>
                                <th>Giá tiền</th>
                                <th>Tác vụ</th>
                            </tr>
                            {dataFilter.map((filter, index) => {
                                return <tr key={filter.id}>
                                    <td>{filter.id}</td>
                                    <td>{filter.title}</td>
                                    <td>{filter.size}</td>
                                    <td>{filter.sl}</td>
                                    <td>{filter.price}</td>
                                    <td>
                                        <a href="add" className="add-cart">
                                            <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                        Thêm
                                        </a>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table >
                </div >
            </div>
        );
    }
}

export default TableShowProduct;
import React from 'react';
import handleAPIsProducts from '../../apis/apiProducts';
import { Link } from "react-router-dom";

class TableProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    onDelete = (id) => {
        var { products } = this.state;
        if (confirm('Bạn có chắc chắn muốn xóa không ?')) { // eslint-disable-line
            handleAPIsProducts('DELETE', null, id).then(data => {
                if (data.status === 200) {
                    var index = this.findIndex(products, id);
                    if (index !== -1) {
                        products.splice(index, 1);
                        this.setState({
                            products: products
                        })
                    }
                }
            })
        } else {
            console.log(id);
        }

    }
    findIndex = (products, id) => {
        var result = -1;
        products.forEach((product, index) => {
            if (product.id === id) {
                result = index;
            }
        });
        return result;
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
        return (
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

                        {this.state.products.map((product, index) => {
                            return <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.size}</td>
                                <td>{product.sl}</td>
                                <td>{product.price}</td>
                                <td className="task">
                                    <Link to="/add-product">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                        Thêm
                                        </Link>
                                    <Link to={`/add-product/${product.id}/edit`}>
                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        Sửa
                                        </Link>
                                    <button type="button" className="btn btn-task"
                                        onClick={() => this.onDelete(product.id)}>                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table >
            </div >
        );
    }
}

export default TableProduct;
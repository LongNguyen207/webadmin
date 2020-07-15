import React from 'react';
import handleAPIsOrders from '../../apis/apiOrders';
import { Link } from "react-router-dom";

class TableOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }
    onDelete = (id) => {
        var { orders } = this.state;
        if (confirm('Bạn có chắc chắn muốn xóa không ?')) { // eslint-disable-line
            handleAPIsOrders('DELETE', null, id).then(data => {
                if (data.status === 200) {
                    var index = this.findIndex(orders, id);
                    if (index !== -1) {
                        orders.splice(index, 1);
                        this.setState({
                            orders : orders
                        })
                    }
                }
            })
        } else {
            console.log(id);
        }

    }
    findIndex = (orders, id) => {
        var result = -1;
        orders.forEach((orders, index) => {
            if (orders.id === id) {
                result = index;
            }
        });
        return result;
    }
    componentDidMount() {
        handleAPIsOrders('GET', null, []).then(data => {
            console.log(data.data);
            this.setState(
                { orders: data.data }
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
                            <th>Tên mặt hàng</th>
                            <th>Số lượng</th>
                            <th>Nơi sản xuất</th>
                            <th>Trạng thái</th>
                            <th>Tác vụ</th>
                        </tr>

                        {this.state.orders.map((order, index) => {
                            return <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.sl}</td>
                                <td>{order.madeby}</td>
                                <td>{order.status}</td>
                                <td className="task">
                                    <Link to="/add-order">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                        Thêm
                                        </Link>
                                    <Link to={`/add-order/${order.id}/edit`}>
                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        Sửa
                                        </Link>
                                    <button type="button" className="btn btn-task"
                                        onClick={() => this.onDelete(order.id)}>                                           
                                         <i className="fa fa-trash-o" aria-hidden="true"></i>
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

export default TableOrder;
import React from 'react';
import handleAPIsOrders from '../../apis/apiOrders';
import handleAPIsProducts from '../../apis/apiProducts';
import TableShowProduct from './../Table-Show-Product/index';

class AddOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtSL: '',
            txtMadeBy: '',
            txtStatus: '',
            keyword: '',
            add: [],
            cart: [],
            total: [],
            sum: ''
        }
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            console.log(id);
            handleAPIsOrders('GET', '', (id)).then(data => {
                var datas = data.data;
                this.setState({
                    id: datas.id,
                    txtName: datas.name,
                    txtSL: datas.sl,
                    txtMadeBy: datas.madeby,
                    txtStatus: datas.status
                })
                console.log(this.state)
            })
        }
    }

    onClickAdd = (id) => {
        console.log(id);
        handleAPIsProducts('GET', '', (id)).then(data => {
            // this.setState({
            //     add: data.data
            // })
            // console.log(this.state.add);
            // var { add } = this.state;
            // handleAPIsOrders('POST', { name: add.title, sl: add.sl, madeby: add.size, status: add.price }, "").then(data => {
            //     console.log(data.data);
            // })
            let a = this.state.cart;
            a.push(data.data)
            let b = this.state.total;
            b.push(data.data.price)
            this.setState({
                cart: a,
                total: b
            })
            console.log(this.state.cart)
        })

    }

    onClick = (e) => {
        window.history.go(-1);
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSave = (e) => {
        e.preventDefault();
        var { id, txtName, txtSL, txtMadeBy, txtStatus } = this.state;
        if (id) {
            handleAPIsOrders('PUT', { name: txtName, sl: txtSL, madeby: txtMadeBy, status: txtStatus }, id).then(data => {
                console.log(data.data);
            })
        } else {
            handleAPIsOrders('POST', { name: txtName, sl: txtSL, madeby: txtMadeBy, status: txtStatus }, "").then(data => {
                console.log(data.data);
            })
        }
    }
    render() {
        var { txtName, txtSL, txtMadeBy, txtStatus } = this.state;
        let { total } = this.state;
        let numberArray = total.map(Number)
        var sum = numberArray.reduce((a, b) => {
            return a + b;
        }, 0)
        console.log(sum)
        return (
            <div className="add-order-container">
                <div className="add-order">
                    <form onSubmit={this.onSave}>
                        <h1>Thêm Mặt Hàng</h1>
                        <div className="title-order">
                            <h3>Tên mặt hàng</h3>
                            <label>
                                <input type="text"
                                    className="input input-add-order"
                                    name="txtName"
                                    value={txtName}
                                    onChange={this.onChange}
                                />
                            </label>
                        </div>
                        <div className="sl-order">
                            <h3>Số lượng</h3>
                            <label>
                                <input type="text"
                                    className="input input-add-order"
                                    name="txtSL"
                                    value={txtSL}
                                    onChange={this.onChange}
                                />
                            </label>
                        </div>
                        <div className="madeby-order">
                            <h3>Xuất Xứ</h3>
                            <label>
                                <input type="text"
                                    className="input input-add-order"
                                    name="txtMadeBy"
                                    value={txtMadeBy}
                                    onChange={this.onChange}
                                />
                            </label>
                        </div>
                        <div className="status-order">
                            <h3>Trạng thái</h3>
                            <label>
                                <input type="text"
                                    className="input input-add-order"
                                    name="txtStatus"
                                    value={txtStatus}
                                    onChange={this.onChange}
                                />
                            </label>
                        </div>
                        <div className="save-order">
                            <button onClick={(e) => this.onClick()} type="submit" className="btn btn-save-order" >Lưu</button>
                        </div>
                    </form>
                    <div className="cart-order">
                        <h1>Giỏ Hàng</h1>
                        <div className="table-container">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Tên mặt hàng</th>
                                        <th>Size</th>
                                        <th>Giá tiền</th>
                                        <th>Id</th>
                                    </tr>
                                    {this.state.cart.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.title}</td>
                                            <td>{item.size}</td>
                                            <td>{item.price} đ</td>
                                            <td>{item.id++}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table >
                        </div>
                        <div className="cart-pay">
                            <h2>Tổng Đơn Hàng:</h2>
                            <div className="pay-lenght">
                                Số lượng sản phẩm trong giỏ hàng: {this.state.cart.length}</div>
                            <span className="pay-all">Tổng tiền: {sum} đ </span>
                            <button type="button"
                                onClick={this.onClickPay = () => {
                                    if(sum!==0){
                                    alert(`Cảm ơn bạn đã mua hàng ^^\nTổng đơn hàng của bạn là: ${sum}${" đ"}`)
                                    } else {
                                        alert("Giỏ hàng của bạn chưa có gì cả\nvui lòng tiếp tục mua hàng rồi thanh toán nhé !")
                                    }
                                }}
                                className="btn btn-pay">
                                Thanh Toán
                                </button>
                        </div>
                    </div>

                </div>
                <TableShowProduct onClickAdd={this.onClickAdd} />
            </div>
        );
    }
}

export default AddOrder;
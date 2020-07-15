import React from 'react';
import handleAPIsOrders from '../../apis/apiOrders';
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
            keyword: ''
        }
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            console.log(id);
            handleAPIsOrders('GET', '', (id)).then(data => {
                console.log(data.data);
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
        return (
            <div className="add-order-container">
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
                <TableShowProduct />
            </div>
        );
    }
}

export default AddOrder;
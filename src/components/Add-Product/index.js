import React from 'react';
import handleAPIsProducts from './../../apis/apiProducts';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtTitle: '',
            txtSize: '',
            txtSL: '',
            txtPrice: ''
        }
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            console.log(id);
            handleAPIsProducts('GET', '', (id)).then(data => {
                console.log(data.data);
                var datas = data.data;
                this.setState({
                    id: datas.id,
                    txtTitle: datas.title,
                    txtSize: datas.size,
                    txtSL: datas.sl,
                    txtPrice: datas.price
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
        var { id, txtTitle, txtSize, txtSL, txtPrice } = this.state;
        if (id) {
            handleAPIsProducts('PUT',{ title: txtTitle, size: txtSize, sl: txtSL, price: txtPrice },id).then(data => {
                console.log(data.data);
            })
        } else {
            handleAPIsProducts('POST', { title: txtTitle, size: txtSize, sl: txtSL, price: txtPrice }, "").then(data => {
                console.log(data.data);
            })
        }
    }
    render() {
        var { txtTitle, txtSize, txtSL, txtPrice } = this.state;
        return (
            <div className="add-product-container">
                <form onSubmit={this.onSave}>
                    <h1>Thêm sản phẩm</h1>
                    <div className="title-product">
                        <h3>Tên sản phẩm</h3>
                        <label>
                            <input type="text"
                                className="input input-add-product"
                                name="txtTitle"
                                value={txtTitle}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="size-product">
                        <h3>Size</h3>
                        <label>
                            <input type="text"
                                className="input input-add-product"
                                name="txtSize"
                                value={txtSize}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="sl-product">
                        <h3>Số lượng</h3>
                        <label>
                            <input type="text"
                                className="input input-add-product"
                                name="txtSL"
                                value={txtSL}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="price-product">
                        <h3>Giá tiền</h3>
                        <label>
                            <input type="text"
                                className="input input-add-product"
                                name="txtPrice"
                                value={txtPrice}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="save-product">
                        <button onClick={(e) => this.onClick()} type="submit" className="btn btn-save-product" >Lưu</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProduct;
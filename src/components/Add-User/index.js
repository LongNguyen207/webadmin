import React from 'react';
import handleAPIsUsers from '../../apis/apiUsers';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtAge: '',
            txtNational: '',
            txtAdress: ''
        }
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            console.log(id);
            handleAPIsUsers('GET', '', (id)).then(data => {
                console.log(data.data);
                var datas = data.data;
                this.setState({
                    id: datas.id,
                    txtName: datas.name,
                    txtAge: datas.age,
                    txtNational: datas.national,
                    txtAdress: datas.adress
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
        var { id, txtName, txtAge, txtNational, txtAdress } = this.state;
        if (id) {
            handleAPIsUsers('PUT',{ name: txtName, age: txtAge, national: txtNational, adress: txtAdress },id).then(data => {
                console.log(data.data);
            })
        } else {
            handleAPIsUsers('POST', { name: txtName, age: txtAge, national: txtNational, adress: txtAdress }, "").then(data => {
                console.log(data.data);
            })
        }
    }
    render() {
        var { txtName, txtAge, txtNational, txtAdress } = this.state;
        return (
            <div className="add-user-container">
                <form onSubmit={this.onSave}>
                    <h1>Thêm khách hàng</h1>
                    <div className="title-user">
                        <h3>Tên Khách Hàng</h3>
                        <label>
                            <input type="text"
                                className="input input-add-user"
                                name="txtName"
                                value={txtName}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="age-user">
                        <h3>Age</h3>
                        <label>
                            <input type="text"
                                className="input input-add-user"
                                name="txtAge"
                                value={txtAge}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="national-user">
                        <h3>Quốc gia</h3>
                        <label>
                            <input type="text"
                                className="input input-add-user"
                                name="txtNational"
                                value={txtNational}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="adress-user">
                        <h3>Địa chỉ</h3>
                        <label>
                            <input type="text"
                                className="input input-add-user"
                                name="txtAdress"
                                value={txtAdress}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="save-user">
                        <button onClick={(e) => this.onClick()} type="submit" className="btn btn-save-user" >Lưu</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddUser;
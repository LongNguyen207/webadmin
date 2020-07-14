import React from 'react';
import handleAPIsUsers from '../../apis/apiUsers';
import { Link } from "react-router-dom";

class TableUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    onDelete = (id) => {
        var { users } = this.state;
        if (confirm('Bạn có chắc chắn muốn xóa không ?')) { // eslint-disable-line
            handleAPIsUsers('DELETE', null, id).then(data => {
                if (data.status === 200) {
                    var index = this.findIndex(users, id);
                    if (index !== -1) {
                        users.splice(index, 1);
                        this.setState({
                            users: users
                        })
                    }
                }
            })
        } else {
            console.log(id);
        }

    }
    findIndex = (users, id) => {
        var result = -1;
        users.forEach((user, index) => {
            if (user.id === id) {
                result = index;
            }
        });
        return result;
    }
    componentDidMount() {
        handleAPIsUsers('GET', null, []).then(data => {
            console.log(data.data);
            this.setState(
                { users: data.data }
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
                            <th>Họ Tên</th>
                            <th>Tuổi</th>
                            <th>Quốc Gia</th>
                            <th>Địa Chỉ</th>
                            <th>Tác vụ</th>
                        </tr>

                        {this.state.users.map((user, index) => {
                            return <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.national}</td>
                                <td>{user.adress}</td>
                                <td className="task">
                                    <Link to="/add-user">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                        Thêm
                                        </Link>
                                    <Link to={`/add-user/${user.id}/edit`}>
                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        Sửa
                                        </Link>
                                    <button type="button" className="btn btn-task"
                                        onClick={() => this.onDelete(user.id)}>                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
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

export default TableUser;
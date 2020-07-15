import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword:''
        }
    }

    onChangeSearch = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }

    onClear = () => {
        this.setState({ keyword: '' })
    }

    render() {
        var { keyword } = this.state;
        return (
            <div className="search-container">
                <div className="search">
                    <h3>Tìm Kiếm Sản Phẩm</h3>
                    <input type="text"
                        name="keyword"
                        value={keyword}
                        onChange={this.onChangeSearch}
                        className="input input-search"
                        placeholder="Nhập từ khóa" />
                    <button type="button"
                        className="btn btn-search"
                        onClick={this.onSearch}
                    >Tìm kiếm</button>
                    <button type="button"
                        className="btn btn-search"
                        onClick={this.onClear}>
                        Xóa</button>
                </div >
            </div>
        );
    }
}

export default Search;
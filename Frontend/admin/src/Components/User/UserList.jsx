import React, { Component } from 'react'
import createAction from '../../Redux/Action';
import { GET_USER_LIST } from '../../Redux/Action/type';
import { userService } from '../../Services'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

class UserList extends Component {

    constructor(props){
        super(props);
        this.state = {
            lengthUserList : 0,
        }
    }

    renderContent = () => {
        if (this.props.userList !== undefined && this.props.userList !== null && this.props.userList.length > 0) {
            return this.props.userList.map((item, index) => {
                return <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name === null ? 'Chưa có thông tin' : item.name}{item.IsAdmin.data[0] === 1 ? <i className="fa fa-star"></i> : ''}</td>
                    <td>{item.address === null ? 'Chưa có thông tin' : item.address}</td>
                    <td>{item.phone === null ? 'Chưa có thông tin' : item.phone}</td>
                    <td>{item.email === null ? 'Chưa có thông tin' : item.email}</td>
                    <td>{item.IsTeacher.data[0] === 0 ? 'Không' : 'Có'}</td>
                    <td>
                        <button class="pd-setting">Active</button>
                    </td>
                </tr>
            })
        }
    }

    onChange = (pageNumber) => {
        this.props.history.push({
            pathname: this.props.match.url,
            search: `?page=${pageNumber}`
        })
    }

    render() {
        return (
            <div>
                <div className="product-status mg-b-30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap">
                                    <h4>Danh sách người dùng</h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Họ và tên</th>
                                                <th>Địa chỉ</th>
                                                <th>Số điện thoại</th>
                                                <th>Email</th>
                                                <th>Là giáo viên</th>
                                                <th>More</th>
                                            </tr>
                                        </thead>
                                        <tbody id="categoryContent">
                                            {this.renderContent()}
                                        </tbody>
                                    </table>
                                    <div className="custom-pagination">
                                        <Pagination className="align-self-center"
                                            showQuickJumper
                                            defaultPageSize={6}
                                            defaultCurrent={1}
                                            total={this.state.lengthUserList}
                                            onChange={this.onChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
    async componentDidMount() {
        const res = await userService.getAllUser();
        this.props.dispatch(
            createAction(
                GET_USER_LIST,
                res.data,
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.UserReducer.UserList,
    }
}

export default connect(mapStateToProps)(UserList)

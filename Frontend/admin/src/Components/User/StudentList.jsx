import React, { Component } from 'react'
import createAction from '../../Redux/Action';
import { GET_USER_LIST } from '../../Redux/Action/type';
import { userService } from '../../Services'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class StudentList extends Component {

    renderContent = () => {
        if (this.props.studentList !== undefined && this.props.studentList !== null && this.props.studentList.length > 0) {
            return this.props.studentList.map((item, index) => {
                return <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name === null ? 'Chưa có thông tin' : item.name}{item.IsAdmin.data[0] === 1 ? <i className="fa fa-star"></i> : ''}</td>
                    <td>{item.address === null ? 'Chưa có thông tin' : item.address}</td>
                    <td>{item.phone === null ? 'Chưa có thông tin' : item.phone}</td>
                    <td>{item.email === null ? 'Chưa có thông tin' : item.email}</td>
                    <td>
                    </td>
                </tr>
            })
        }
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
                                            </tr>
                                        </thead>
                                        <tbody id="categoryContent">
                                            {this.renderContent()}
                                        </tbody>
                                    </table>
                                    <div className="custom-pagination">
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
        console.log(res.data)
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
        studentList : state.UserReducer.StudentList,
    }
}

export default connect(mapStateToProps)(StudentList)

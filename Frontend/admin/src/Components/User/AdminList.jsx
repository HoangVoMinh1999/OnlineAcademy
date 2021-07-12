import React, { Component } from 'react'
import createAction from '../../Redux/Action';
import { GET_USER_LIST } from '../../Redux/Action/type';
import { userService } from '../../Services'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AdminList extends Component {

    renderContent = () => {
        if (this.props.adminList !== undefined && this.props.adminList !== null && this.props.adminList.length > 0) {
            return this.props.adminList.map((item, index) => {
                return <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name === null ? 'Chưa có thông tin' : item.name}</td>
                    <td>{item.address === null ? 'Chưa có thông tin' : item.address}</td>
                    <td>{item.phone === null ? 'Chưa có thông tin' : item.phone}</td>
                    <td>{item.email === null ? 'Chưa có thông tin' : item.email}</td>
                    <td>{item.IsTeacher.data[0] === 0 ? 'Không' : 'Có'}</td>
                    <td>
                        <Link to={`/course-edit/${item.id}`}><button id="categoryEdit" title="Edit" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                        {/* Button trigger modal */}
                        <button type="button" id="categoryRemove" title="Trash" className="pd-setting-ed" data-toggle="modal" data-target="#deleteCategory" onClick={() => this.handleButtonDelete(item.id)}>
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                        {/* Modal */}
                        <div className="modal fade" id="deleteCategory" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-danger" id="exampleModalLongTitle">Thông báo</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="text-danger">Bạn có chắn chắn muốn xóa loại khóa học này không ???</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={() => this.handleClickButtonConfirmDelete()}>Đồng ý</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" >Quay lại</button>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                                <th>Là giáo viên</th>
                                                <th>More</th>
                                            </tr>
                                        </thead>
                                        <tbody id="categoryContent">
                                            {this.renderContent()}
                                        </tbody>
                                    </table>
                                    <div className="custom-pagination">
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                        </ul>
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
        adminList: state.UserReducer.AdminList,
    }
}

export default connect(mapStateToProps)(AdminList)

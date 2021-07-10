import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { GET_LIST } from "../../Redux/Action/type"
import { Link } from 'react-router-dom';
import createAction from '../../Redux/Action'
import { categoryService } from '../../Services/';
import { Pagination } from 'antd';
class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_id: 0,
        }
    }

    handleButtonDelete = (id) => {
        this.setState({
            category_id: id,
        })
    }

    handleClickButtonConfirmDelete = async () => {
        let res = await categoryService.deleteCategory(this.state.category_id);
        res = await categoryService.getAllCategories();
        this.props.dispatch(
            createAction(
                GET_LIST,
                res.data
            )
        )
        this.forceUpdate();
    }

    handleClickButtonEdit = async (id) => {
        const res = await categoryService.getCategoryDetail(id);
    }

    renderContent = () => {
        return (
            this.props.categoryList.map((category, index) => {
                const mainCategory = category.category_id !== null ? this.props.mainCategoryList.find(t => t.id === category.category_id) : '';
                return <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{mainCategory === '' ? <i className="fa fa-star"></i> : mainCategory.name}</td>
                    <td>
                        <button class="pd-setting">Active</button>
                    </td>
                    <td>
                        <Link to={`/category-edit/${category.id}`}><button id="categoryEdit" title="Edit" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                        {/* Button trigger modal */}
                        <button type="button" id="categoryRemove" title="Trash" className="pd-setting-ed" data-toggle="modal" data-target="#deleteCategory" onClick={() => this.handleButtonDelete(category.id)}>
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
        )
    }

    render() {
        return (
            <div>
                <div className="product-status mg-b-30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap">
                                    <h4>Products List</h4>
                                    <div className="add-product">
                                        <Link to="/category-add">Thêm loại khóa học</Link>
                                    </div>
                                    <div className="header-top-menu tabl-d-n hd-search-rp">
                                        <div className="breadcome-heading">
                                            <form role="search" className="d-inline-flex p-2"  method='GET'>
                                                <input type="text" name="search" placeholder="Search..." className="form-control" />
                                            </form>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên</th>
                                                <th>Category Cha</th>
                                                <th>Status</th>
                                                <th>Tùy chỉnh</th>
                                            </tr>
                                        </thead>
                                        <tbody id="categoryContent">
                                            {this.renderContent()}
                                        </tbody>
                                    </table>
                                    <div className="custom-pagination">
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" href="/">1</a></li>
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
        const res = await categoryService.getAllCategories();
        this.props.dispatch(
            createAction(
                GET_LIST,
                res.data
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.CategoryList,
        mainCategoryList: state.CategoryReducer.MainCategoryList
    }
}



export default connect(mapStateToProps)(CategoryList);
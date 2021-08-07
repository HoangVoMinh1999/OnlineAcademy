import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { GET_CHILD_CATEGORY_LIST, GET_LIST, GET_MAIN_CATEGORY_LIST } from "../../Redux/Action/type"
import { Link } from 'react-router-dom';
import createAction from '../../Redux/Action'
import { categoryService } from '../../Services/';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Button } from "react-bootstrap";
import swal from 'sweetalert'

class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_id: 0,
            lengthCategoryList: 0,
        }
    }

    handleButtonDelete = (id) => {
        swal("Bạn có chắc chắn muốn xóa mục này không ???", {
            buttons: {
                confirm: {
                    text: "Xác nhận",
                    value: "confirm"
                },
                cancel: "Hủy bỏ"
            },
        })
            .then(async (value) => {
                switch (value) {
                    case "confirm":
                        let res = await categoryService.deleteCategory(id);
                        res = await categoryService.getAllCategories();
                        this.props.dispatch(
                            createAction(
                                GET_MAIN_CATEGORY_LIST,
                                res.data.listCategory
                            )
                        )
                        this.props.dispatch(
                            createAction(
                                GET_CHILD_CATEGORY_LIST,
                                res.data.listCategory
                            )
                        )

                        res = await categoryService.getAllCategories({ page: 1 });
                        this.props.dispatch(
                            createAction(
                                GET_LIST,
                                res.data.listCategory
                            )
                        )
                        this.setState({
                            ...this.state,
                            lengthCategoryList: res.data.lengthCategoryList,
                        })
                }
            });

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
                        <button type="button" id="categoryRemove" title="Trash" className="pd-setting-ed" onClick={() => this.handleButtonDelete(category.id)}>
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            })
        )
    }

    onChange = (pageNumber) => {
        this.props.history.push({
            pathname: this.props.match.url,
            search: `?page=${pageNumber}`
        })
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            if (nextProps.location.search === '') {
                this.props.history.push({
                    pathname: this.props.match.url,
                    search: `?page=1`
                })
            }
            else {
                const searchParams = new URLSearchParams(nextProps.location.search);
                let query = {};
                if (searchParams.get('page') !== null) {
                    query.page = searchParams.get('page');
                }
                const res = await categoryService.getAllCategories(query);
                this.props.dispatch(
                    createAction(
                        GET_LIST,
                        res.data.listCategory
                    )
                )
                this.setState({
                    ...this.state,
                    lengthCategoryList: res.data.lengthCategoryList
                })
            }
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
                                    <h4>Danh sách loại khóa học</h4>
                                    <div className="add-product">
                                        <Link to="/category-add">Thêm loại khóa học</Link>
                                    </div>
                                    <div className="header-top-menu tabl-d-n hd-search-rp">
                                        <div className="breadcome-heading">
                                            <form role="search" className="d-inline-flex p-2" method='GET'>
                                                <input type="text" name="search" placeholder="Tìm kiếm..." className="form-control" />
                                            </form>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên</th>
                                                <th>Loại khóa học cha</th>
                                                <th>Trạng thái</th>
                                                <th>Tùy chỉnh</th>
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
                                            total={this.state.lengthCategoryList}
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
        const searchParams = new URLSearchParams(this.props.location.search);
        if (searchParams.get('page') === null) {
            this.props.history.push({
                pathname: this.props.match.url,
                search: `?page=1`
            })
        }
        else {
            const searchParams = new URLSearchParams(this.props.location.search);
            let query = {};
            if (searchParams.get('page') !== null) {
                query.page = searchParams.get('page');
            }
            const res = await categoryService.getAllCategories(query);
            this.props.dispatch(
                createAction(
                    GET_LIST,
                    res.data.listCategory
                )
            )
            this.props.dispatch(
                createAction(
                    GET_MAIN_CATEGORY_LIST,
                    res.data.listCategory
                )
            )
            this.props.dispatch(
                createAction(
                    GET_CHILD_CATEGORY_LIST,
                    res.data.listCategory
                )
            )

            this.setState({
                ...this.state,
                lengthCategoryList: res.data.lengthCategoryList
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.CategoryList,
        mainCategoryList: state.CategoryReducer.MainCategoryList
    }
}



export default connect(mapStateToProps)(CategoryList);
import React, { Component } from 'react'
import { categoryService, courseService } from '../../Services'
import createAction from '../../Redux/Action'
import { connect } from 'react-redux'
import { GET_COURSE_LIST, GET_LIST } from '../../Redux/Action/type'
import { Link } from 'react-router-dom'

class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course_id: 0,
            query:{
                search : ''
            }
        }
    }

    renderContent = () => {
        return this.props.courseList.map((course, index) => {
            const isFinish = course.IsFinish.data[0] === 1 ? "Đã hoàn thành" : "Chưa hoàn thành"
            const category = this.props.categoryList.find(t => t.id === course.category_id);
            return <tr key={index}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{category.name}</td>
                <td>{course.rate}</td>
                <td>{course.price}</td>
                <td>{course.sale}%</td>
                <td>{course.current_student} / {course.max_students}</td>
                <td>{isFinish}</td>
                <td>
                    <Link to={`/course-edit/${course.id}`}><button id="categoryEdit" title="Edit" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                    {/* Button trigger modal */}
                    <button type="button" id="categoryRemove" title="Trash" className="pd-setting-ed" data-toggle="modal" data-target="#deleteCategory" onClick={() => this.handleButtonDelete(course.id)}>
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

    handleButtonDelete = (id) => {
        this.setState({
            course_id: id,
        })
    }

    handleClickButtonConfirmDelete = async () => {
        const res = await courseService.deleteCourse(this.state.course_id);
    }

    handleSearch = (event) => {
        let {name,value} = event.target;
        this.setState({
            query : {
                ...this.state.query,
                [name] : value
            }
        })
    }

    handleSubmitSearch = async (event) => {
        event.preventDefault();
        const obj = {
            'search' : this.state.query.search
        }
        const res = await courseService.getCoursesByQuery(obj);
        this.props.dispatch(
            createAction(
                GET_LIST,
                res.data
            )
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
                                        <Link to="/course-add">Thêm khóa học</Link>
                                    </div>
                                    <div className="header-top-menu tabl-d-n hd-search-rp">
                                        <div className="breadcome-heading">
                                            <form role="search" className="d-inline-flex p-2" onSubmit={this.handleSubmitSearch} method='GET'>
                                                <input type="text" name="search" value={this.state.query.search} placeholder="Search..." className="form-control" onChange={this.handleSearch}/>
                                            </form>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên khóa học</th>
                                                <th>Loại khóa học</th>
                                                <th>Đánh giá</th>
                                                <th>Giá</th>
                                                <th>Giảm giá</th>
                                                <th>Học sinh</th>
                                                <th>Hoàn thành</th>
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
        if (this.props.categoryList.length === 0) {
            const res = await categoryService.getAllCategories();
            this.props.dispatch(
                createAction(
                    GET_LIST,
                    res.data
                )
            )
        }
        const res = await courseService.getAllCourses();
        this.props.dispatch(
            createAction(
                GET_COURSE_LIST,
                res.data
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList,
        categoryList: state.CategoryReducer.ChildCategory,
    }
}

export default connect(mapStateToProps)(CourseList)
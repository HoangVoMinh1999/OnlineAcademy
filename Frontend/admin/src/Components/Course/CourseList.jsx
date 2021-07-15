import React, { Component } from 'react'
import { categoryService, courseService } from '../../Services'
import createAction from '../../Redux/Action'
import { connect } from 'react-redux'
import { GET_COURSE_LIST, GET_LIST } from '../../Redux/Action/type'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import swal from 'sweetalert'

class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course_id: 0,
            query: {
                search: ''
            },
            lengthCourseList: 0,
        }
    }

    renderContent = () => {
        return this.props.courseList.map((course, index) => {
            const isFinish = course.IsFinish.data[0] === 1 ? "Đã hoàn thành" : "Chưa hoàn thành"
            let category = course.category_id === null ? null : this.props.categoryList.find(t => t.id === course.category_id);
            return <tr key={index}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{(category === null || category === undefined) ? 'Chưa có thông tin' : category.name}</td>
                <td>{course.rate}</td>
                <td>{course.price}</td>
                <td>{course.sale}%</td>
                <td>{course.current_student} / {course.max_students}</td>
                <td>{isFinish}</td>
                <td>
                    <Link to={`/course-edit/${course.id}`}><button id="categoryEdit" title="Edit" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                    {/* Button trigger modal */}
                    <button type="button" id="categoryRemove" title="Trash" className="pd-setting-ed" onClick={() => this.handleButtonDelete(course.id)}>
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        })
    }

    handleButtonDelete = (id) => {
        swal("Bạn có chắc chắn muốn xóa khóa học này không ???", {
            buttons: {
              confirm:{
                  text: "Xác nhận",
                  value:"confirm"
              },
              cancel : "Quay lại"
            },
          })
          .then(async (value) => {
            switch (value) {
           
              case "confirm":
                let res = await courseService.deleteCourse(id);
                res = await courseService.getAllCourses({page:1});
                this.props.dispatch(
                    createAction(
                        GET_COURSE_LIST,
                        res.data.listCourse
                    )
                )
                this.setState({
                    ...this.state,
                    lengthCourseList: res.data.length
                })
                this.props.history.push({
                    pathname: this.props.match.url,
                    search: `?page=1`
                })
            }
          });
    }

    handleSearch = (event) => {
        let { name, value } = event.target;
        this.setState({
            query: {
                ...this.state.query,
                [name]: value
            }
        })
    }

    handleSubmitSearch = async (event) => {
        event.preventDefault();
        const searchParams = new URLSearchParams(this.props.location.search);
        const query = {};
        if (searchParams.get('page') !== '') {
            query.page = searchParams.get('page');
        }
        query.search = this.state.query.search;
        const res = await courseService.getAllCourses(query);
        this.props.dispatch(
            createAction(
                GET_COURSE_LIST,
                res.data.listCourse
            )
        )
        this.setState({
            ...this.state,
            lengthCourseList: res.data.length
        })
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            const searchParams = new URLSearchParams(this.props.location.search);
            const query = {};
            if (searchParams.get('page') !== '') {
                query.page = searchParams.get('page');
            }
            query.search = this.state.query.search;
            const res = await courseService.getAllCourses(query);
            this.props.dispatch(
                createAction(
                    GET_COURSE_LIST,
                    res.data.listCourse
                )
            )
            this.setState({
                ...this.state,
                lengthCourseList: res.data.length
            })
        }
    }

    onChange = (pageNumber) => {
        this.props.history.push({
            pathname: this.props.match.url,
            search : `?search=${this.state.query.search}&page=${pageNumber}`
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
                                    <h4>Products List</h4>
                                    <div className="add-product">
                                        <Link to="/course-add">Thêm khóa học</Link>
                                    </div>
                                    <div className="header-top-menu tabl-d-n hd-search-rp">
                                        <div className="breadcome-heading">
                                            <form role="search" className="d-inline-flex p-2" onSubmit={this.handleSubmitSearch} method='GET'>
                                                <input type="text" name="search" value={this.state.query.search} placeholder="Search..." className="form-control" onChange={this.handleSearch} />
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
                                        <Pagination className="align-self-center"
                                            showQuickJumper
                                            defaultPageSize={6}
                                            defaultCurrent={1}
                                            total={this.state.lengthCourseList}
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
        if (this.props.categoryList.length === 0) {
            const res = await categoryService.getAllCategories();
            this.props.dispatch(
                createAction(
                    GET_LIST,
                    res.data
                )
            )
        }
        const searchParams = new URLSearchParams(this.props.location.search);
        const query = {};
        if (searchParams.get('page') !== '') {
            query.page = searchParams.get('page');
        }
        const res = await courseService.getAllCourses(query);
        this.props.dispatch(
            createAction(
                GET_COURSE_LIST,
                res.data.listCourse
            )
        )
        this.setState({
            ...this.state,
            lengthCourseList: res.data.length
        })
    }
}

function onChange(pageNumber) {
    console.log('Page: ', pageNumber);
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList,
        categoryList: state.CategoryReducer.ChildCategory,
    }
}

export default connect(mapStateToProps)(CourseList)
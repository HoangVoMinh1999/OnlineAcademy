import React, { Component } from 'react'
import { connect } from 'react-redux'
import SubTabCourse from '../Components/SubTabCourse'
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { courseService } from '../Services';
import createAction from '../Redux/Action';
import { GET_COURSE_LIST } from '../Redux/Action/type';

class CourseListByCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: 0,
            listCategory: [],
            reload: false,
            lengthCourseList: 0,
            query: {
                name: '',
                field: '',
                desc: null,
            }
        }
    }
    handleClick = (event) => {
        const category_id = this.props.match.params.category_id;
        this.setState({
            ...this.state,
            isActive: parseInt(event.target.id)
        })
        this.props.history.push({
            pathname: `/course/${category_id}`,
            search: `?category=${event.target.id}&page=1`
        })
    }

    renderTab = () => {
        return this.state.listCategory.map((category, index) => {
            return <li key={index} className="nav-item">
                <a className={`nav-link ${this.state.isActive === category.id ? "active" : ""}`} id={category.id} data-toggle="tab" href={`#${category.id}`} role="tab" aria-controls={category.id} aria-selected="false" onClick={this.handleClick}>{category.name}</a>
            </li>
        })
    }

    renderTabContent = () => {
        const searchParams = new URLSearchParams(this.props.location.search);
        return this.state.listCategory.map((category, index) => {
            return <SubTabCourse isActive={this.state.isActive} id={category.id} key={index} page={searchParams.get('page')}></SubTabCourse>
        })
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.category_id !== this.props.match.params.category_id) {
            const searchParams = new URLSearchParams(nextProps.location.search);
            if (searchParams.get('page') === null && searchParams.get('category') === null) {
                const category_id = nextProps.match.params.category_id;
                let listCategory = this.props.categoryList.filter(t => t.category_id == category_id);
                if (listCategory.length > 0) {
                    this.props.history.push({
                        pathname: `/course/${category_id}`,
                        search: `?category=${listCategory[0].id}&page=1`
                    })
                }
                else {
                    this.props.history.push({
                        pathname: nextProps.match.url
                    })
                }
                if (listCategory.length > 0) {
                    this.setState({
                        isActive: listCategory[0].id,
                    })
                }
                this.setState({
                    listCategory: listCategory,
                })
            }
        }
        else if (nextProps.location.search !== this.props.location.search) {
            const searchParams = new URLSearchParams(this.props.location.search);
            if (searchParams.hasOwnProperty('category')) {
                const category_id = parseInt(searchParams.category);
                this.setState({
                    ...this.state,
                    isActive: category_id,
                })
            }
        }

        if (nextProps.location.search !== this.props.location.search) {
            const searchParams = new URLSearchParams(nextProps.location.search);
            const query = {};
            if (searchParams.get('page') !== '') {
                query.page = searchParams.get('page');
            }
            if (searchParams.get('category') !== '') {
                query.category = searchParams.get('category');
            }
            if (searchParams.get('search') !== '') {
                query.search = searchParams.get('search');
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
                lengthCourseList: res.data.length,
            })
        }
        window.scrollTo(0, 0)
    }


    onChange = (pageNumber) => {
        this.props.history.push({
            pathname: this.props.match.url,
            search: `?category=${this.state.isActive}&page=${pageNumber}`
        })
    }

    handleQueryChange = (event) => {
        let { name, value } = event.target;
        if (name === 'desc') {
            value = value === "1" ? true : false;
        }
        this.setState({
            ...this.state,
            query: {
                ...this.state.query,
                [name]: value
            }
        });
    }

    handleQuerySubmit = async (event) => {
        event.preventDefault();
        const searchParams = new URLSearchParams(this,this.props.location.search);
        let query = {
            category: searchParams.get('category'),
            page : searchParams.get('page'),
            search : this.state.query.name,
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
            lengthCourseList: res.data.length,
        })
    }

    render() {
        return (
            <div>
                <div className="slider_area ">
                    <div className="single_slider d-flex align-items-center justify-content-center slider_bg_1" style={{ height: '20rem' }}>
                        <div className="container">
                            <div className="section_title text-center" style={{ marginTop: '5rem' }}>
                                <h3 style={{ color: 'white' }}>Danh sách khóa học</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* popular_courses_start */}
                <div className="popular_courses">
                    <div className="container">
                        <div className="row">
                            <form style={{ width: '100%' }} onSubmit={this.handleQuerySubmit}>
                                <div className="d-flex justify-content-between">
                                    <div style={{ width: '40%', margin: '10px' }}>
                                        <label >Nhập giá trị tìm kiếm</label>
                                        <input type="text" name="name" value={this.state.query.name} style={{ padding: '10px', width: '100%' }} placeholder="Nhập tên khóa học cần tìm kiếm" onChange={this.handleQueryChange} />
                                    </div>
                                    <div style={{ width: '20%', margin: '10px' }}>
                                        <label >Sắp xếp theo:</label>
                                        <select name="field" value={this.state.query.field} style={{ padding: '10px', width: '100%' }} onChange={this.handleQueryChange}>
                                            <option value="day">Mới nhất</option>
                                            <option value="price">Giá</option>
                                            <option value="students">Số lượng học viên</option>
                                            <option value="rate">Đánh giá</option>
                                        </select>
                                    </div>
                                    <div style={{ width: '20%', margin: '10px' }}>
                                        <label>Giá trị sắp xếp</label>
                                        <select name="desc" value={this.state.query.desc === true ? "1" : "0"} style={{ padding: '10px', width: '100%' }} onChange={this.handleQueryChange}>
                                            <option value="0">Tăng dần</option>
                                            <option value="1">Giảm dần</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="genric-btn default radius" style={{ height: '50%', padding: '10px 30px', marginTop: '1.5rem' }}>Tìm kiếm</button>
                                </div>
                            </form>
                        </div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="course_nav">
                                    <nav>
                                        <ul className="nav" id="myTab" role="tablist">
                                            {this.renderTab()}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="all_courses">
                        <div className="container d-flex flex-column">
                            <div className="tab-content" id="myTabContent" >
                                {this.renderTabContent()}
                            </div>
                            <Pagination className="align-self-center"
                                showQuickJumper
                                defaultPageSize={6}
                                defaultCurrent={1}
                                total={this.state.lengthCourseList}
                                onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                {/* popular_courses_end*/}
            </div>
        )
    }
    componentDidMount() {
        const category_id = this.props.match.params.category_id;
        const listCategory = this.props.categoryList.filter(t => t.category_id == category_id);
        if (listCategory.length > 0) {
            this.setState({
                isActive: listCategory[0].id,
            })
        }
        this.setState({
            listCategory: listCategory,
        })
        if (listCategory.length > 0) {
            this.props.history.push({
                pathname: this.props.match.url,
                search: `?category=${listCategory[0].id}&page=1`
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList,
        categoryList: state.CategoryReducer.CategoryList,
    }
}

export default connect(mapStateToProps)(CourseListByCategory)
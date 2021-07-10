import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Slider } from '../Components/Slider';
import SubTabCourse from '../Components/SubTabCourse'

class CourseListByCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: 0,
            listCategory: [],
            reload: false,
        }
    }
    handleClick = (event) => {
        this.setState({
            ...this.state,
            isActive: event.target.id
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
        return this.state.listCategory.map((category, index) => {
            return <SubTabCourse isActive={this.state.isActive} id={category.id} key={index}></SubTabCourse>
        })
    }

    componentWillReceiveProps(nextProps) {
        const category_id = nextProps.match.params.category_id;
        const listCategory = this.props.categoryList.filter(t => t.category_id == category_id);
        if (listCategory.length > 0) {
            this.setState({
                isActive: listCategory[0].id,
            })
        }
        this.setState({
            listCategory: listCategory,
        })
    }

    render() {
        return (
            <div>
                <div className="slider_area ">
                    <div className="single_slider d-flex align-items-center justify-content-center slider_bg_1" style={{height: '25rem'}}>
                        <div className="container">
                            <div className="section_title text-center" style={{marginTop: '5rem'}}>
                                <h3  style={{ color:'white'}}>Danh sách khóa học</h3>
                                <p  style={{ color:'whitesmoke'}}>Your domain control panel is designed for ease-of-use and <br /> allows for all aspects of your domains.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* popular_courses_start */}
                <div className="popular_courses">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                            </div>
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
                        <div className="container">
                            <div className="tab-content" id="myTabContent" >
                                {this.renderTabContent()}
                            </div>
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
    }
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList,
        categoryList: state.CategoryReducer.CategoryList,
    }
}

export default connect(mapStateToProps)(CourseListByCategory)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CourseItem from '../Components/CourseItem';
import { GET_CATEGORY_LIST, GET_COURSE_LIST, GET_WATCHLIST, GET_PURCHASED_COURSE_LIST } from '../Redux/Action/type'
import createAction from '../Redux/Action'
import { purchasedCourseService } from '../Services';

class PurchasedCourse extends Component {
    renderTab = () => {
        return <li className="nav-item">
            <a className={`nav-link  active`} data-toggle="tab" href="#" role="tab" aria-controls="purchasedcourse" aria-selected="false" ></a>
        </li>
    }

    renderTabContent = () => {
        let courseIdInPurchasedCourseList = [];
        console.log(this.props.purchasedcourseList);
        this.props.purchasedcourseList.forEach(element => {
            courseIdInPurchasedCourseList.push(element.course_id);
        });
        console.log(courseIdInPurchasedCourseList);
        if (courseIdInPurchasedCourseList.length > 0) {
            const purchasedcourseList = this.props.courseList.filter(t => courseIdInPurchasedCourseList.includes(t.id));
            return purchasedcourseList.map((course, index) => {
                return <div className="col-xl-4 col-lg-4 col-md-6">
                    <CourseItem info={course} key={index} reload='true'></CourseItem>
                </div>
            })
        }

    }
    render() {
        return (
            <div>
                <div className="slider_area ">
                    <div className="single_slider d-flex align-items-center justify-content-center slider_bg_1" style={{ height: '20rem' }}>
                        <div className="container">
                            <div className="section_title text-center" style={{ marginTop: '5rem' }}>
                                <h3 style={{ color: 'white' }}>Danh sách khóa học đã mua</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* popular_courses_start */}
                <div className="popular_courses">
                    <div className="container">
                        <div className="row">
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
                            <div className="row">
                                {this.renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>
                {/* popular_courses_end*/}
            </div>
        )
    }

    async componentDidMount() {
        if (localStorage.user_UserId !== null && localStorage.user_UserId !== undefined) {
            let res_purchasedcourselist = await purchasedCourseService.getPurchasedCourse4User(localStorage.user_UserId);
            this.props.dispatch(
                createAction(
                    GET_PURCHASED_COURSE_LIST,
                    res_purchasedcourselist.data,
                )
            )
        }
        window.scrollTo(0,0);
    }
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList,
        purchasedcourseList: state.PurchasedCourseReducer.PurchasedCourseList,
    }
}

export default connect(mapStateToProps)(PurchasedCourse);
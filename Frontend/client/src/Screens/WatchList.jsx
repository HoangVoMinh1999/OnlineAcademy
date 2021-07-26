import React, { Component } from 'react'
import { connect } from 'react-redux'
import CourseItem from '../Components/CourseItem';
import { GET_CATEGORY_LIST, GET_COURSE_LIST, GET_WATCHLIST } from '../Redux/Action/type'
import createAction from '../Redux/Action'
import { categoryService, courseService, watchlistService } from '../Services/index'

class WatchList extends Component {
    renderTab = () => {
        return <li className="nav-item">
            <a className={`nav-link  active`} data-toggle="tab" href="#" role="tab" aria-controls="watchlist" aria-selected="false" ></a>
        </li>
    }

    renderTabContent = () => {
        let courseIdInWatchList = [];
        this.props.watchList.forEach(element => {
            courseIdInWatchList.push(element.CourseId);
        });
        console.log(courseIdInWatchList);
        if (courseIdInWatchList.length > 0) {
            const watchList = this.props.courseList.filter(t => courseIdInWatchList.includes(t.id));
            return watchList.map((course, index) => {
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
                                <h3 style={{ color: 'white' }}>Danh sách khóa học yêu thích</h3>
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
            let res_watchlist = await watchlistService.getAllWatchList(localStorage.user_UserId);
            this.props.dispatch(
                createAction(
                    GET_WATCHLIST,
                    res_watchlist.data.watchlist,
                )
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList,
        watchList: state.WatchListReducer.WatchList,
    }
}

export default connect(mapStateToProps)(WatchList);
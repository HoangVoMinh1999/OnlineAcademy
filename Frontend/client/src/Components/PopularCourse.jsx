import React, { Component } from 'react'
import { CourseItem } from './CourseItem'
import { SubTabCourse } from './SubTabCourse'

export class PopularCourse extends Component {
    render() {
        return (
            <div>
                {/* popular_courses_start */}
                <div className="popular_courses">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="section_title text-center mb-100">
                                    <h3>Popular Courses</h3>
                                    <p>Your domain control panel is designed for ease-of-use and <br /> allows for all aspects of your domains.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="course_nav">
                                    <nav>
                                        <ul className="nav" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="suggested-course" data-toggle="tab" href="#suggested-course" role="tab" aria-controls="suggested-course" aria-selected="true">Suggested Course</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="most-view" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Most View</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="most-popular" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Most Popular</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="new-course" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">New Courses</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="all_courses">
                        <div className="container">
                            <div className="tab-content" id="myTabContent" >
                                <div className="tab-pane fade show active" id="suggested-course" role="tabpanel" aria-labelledby="suggested-course">
                                    <SubTabCourse id="suggested-course" ariaLabelledby="suggested-course"></SubTabCourse>
                                </div>
                                <div className="tab-pane fade show active" id="most-view" role="tabpanel" aria-labelledby="most-view">
                                    <SubTabCourse id="most-view" ariaLabelledby="most-view"></SubTabCourse>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* popular_courses_end*/}
            </div>
        )
    }
}
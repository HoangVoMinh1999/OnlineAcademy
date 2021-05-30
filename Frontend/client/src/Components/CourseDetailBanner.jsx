import React, { Component } from 'react'

export class CourseDetailBanner extends Component {
    render() {
        return (
            <div>
                {/* bradcam_area_start */}
                <div className="courses_details_banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="course_text">
                                    <h3>UI/UX design with <br /> Adobe XD with</h3>
                                    <div className="prise">
                                        <span className="inactive">$89.00</span>
                                        <span className="active">$49</span>
                                    </div>
                                    <div className="rating">
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <span>(4.5)</span>
                                    </div>
                                    <div className="hours">
                                        <div className="video">
                                            <div className="single_video">
                                                <i className="fa fa-clock-o" /> <span>12 Videos</span>
                                            </div>
                                            <div className="single_video">
                                                <i className="fa fa-play-circle-o" /> <span>9 Hours</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* bradcam_area_end */}

            </div>
        )
    }
}
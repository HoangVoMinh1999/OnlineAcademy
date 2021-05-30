import React, { Component } from 'react'

export class CourseItem extends Component {
    render() {
        return (
            <div>
                <div className="single_courses">
                    <div className="thumb">
                        <a href="#">
                            <img src="img/courses/1.png" alt />
                        </a>
                    </div>
                    <div className="courses_info">
                        <span>Photoshop</span>
                        <h3><a href="#">Mobile App design step by step <br />
                        from beginner</a></h3>
                        <div className="star_prise d-flex justify-content-between">
                            <div className="star">
                                <i className="flaticon-mark-as-favorite-star" />
                                <span>(4.5)</span>
                            </div>
                            <div className="prise">
                                <span className="offer">$89.00</span>
                                <span className="active_prise">
                                    $49
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
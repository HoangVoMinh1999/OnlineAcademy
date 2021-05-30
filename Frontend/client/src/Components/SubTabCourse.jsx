import React, { Component } from 'react'
import { CourseItem } from './CourseItem'

export class SubTabCourse extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <CourseItem></CourseItem>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <CourseItem></CourseItem>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <CourseItem></CourseItem>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <CourseItem></CourseItem>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <CourseItem></CourseItem>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <CourseItem></CourseItem>
                    </div>
                </div>
            </div>

        )
    }
}
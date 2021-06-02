import React, { Component } from 'react'
import SubTabCourse from './SubTabCourse'

export class PopularCourse extends Component {

    constructor(props){
        super(props);
        this.state ={
            isActive : "suggested-course",
        }
    }

    handleClick = (event) => {
        let {id} = event.target;
        this.setState({
            isActive : id
        })
    }

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
                                                <a className="nav-link active" id="suggested-course" data-toggle="tab" href="#suggested-course" role="tab" aria-controls="suggested-course" aria-selected="true" onClick={this.handleClick}>Suggested Course</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="most-view" data-toggle="tab" href="#most-view" role="tab" aria-controls="most-view" aria-selected="false" onClick={this.handleClick}>Most View</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="most-popular" data-toggle="tab" href="#most-popular" role="tab" aria-controls="most-popular" aria-selected="false" onClick={this.handleClick}>Most Popular</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="new-course" data-toggle="tab" href="#new-course" role="tab" aria-controls="new-course" aria-selected="false" onClick={this.handleClick}>New Courses</a>
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
                                <SubTabCourse isActive={this.state.isActive} id="suggested-course" ></SubTabCourse>
                                <SubTabCourse isActive={this.state.isActive} id="most-view" ></SubTabCourse>
                                <SubTabCourse isActive={this.state.isActive} id="most-popular" ></SubTabCourse>
                                <SubTabCourse isActive={this.state.isActive} id="new-course"></SubTabCourse>
                            </div>
                        </div>
                    </div>
                </div>
                {/* popular_courses_end*/}
            </div>
        )
    }
}
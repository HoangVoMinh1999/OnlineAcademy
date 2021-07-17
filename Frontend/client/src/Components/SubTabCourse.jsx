import React, { Component } from 'react'
import { connect } from 'react-redux';
import CourseItem from './CourseItem'

class SubTabCourse extends Component {

    renderContent = () => {
        if (this.props.id === "suggested-course"){
            this.props.courseList.sort((a,b) => b.rate - a.rate);
            return this.props.courseList.map((course,index) => {
                if (index < 6){
                    return(
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <CourseItem info={course}></CourseItem>
                        </div>
                    )
                }
            })
        }
        else if (this.props.id === "most-view"){
            this.props.courseList.sort((a,b) => b.view - a.view);
            return this.props.courseList.map((course,index) => {
                if (index < 6){
                    return(
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <CourseItem info={course}></CourseItem>
                        </div>
                    )
                }
            })
        }
        else if (this.props.id === "most-popular"){
            this.props.courseList.sort((a,b) => b.current_student -a.current_student);
            return this.props.courseList.map((course,index) => {
                if (index < 6){
                    return(
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <CourseItem info={course}></CourseItem>
                        </div>
                    )
                }
            })
        }
        else if (this.props.id === "new-course"){
            this.props.courseList.sort((a,b) => b.id - a.id);
            return this.props.courseList.map((course,index) => {
                if (index < 6){
                    return(
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <CourseItem info={course}></CourseItem>
                        </div>
                    )
                }
            })
        }
        else {
            const cList = this.props.courseList.filter(t => t.category_id == this.props.isActive)
            return cList.map((course,index) => {
                return(
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <CourseItem info={course} key={index} reload='true'></CourseItem>
                    </div>
                )
            })
        }
    }

    render() {
        const isActive = this.props.isActive == this.props.id ? "show active" : "";
        return (
            <div className={`tab-pane fade ${isActive}`} id={this.props.id} role="tabpanel" aria-labelledby={this.props.id}>
                <div className="row">
                    {this.renderContent()}
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        courseList : state.CourseReducer.CourseList
    }
}

export default connect(mapStateToProps)(SubTabCourse)
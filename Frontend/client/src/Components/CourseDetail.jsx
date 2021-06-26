import React, { Component } from 'react'
import { connect } from 'react-redux'
import { lessonService } from '../Services';
import CourseDetailBanner from './CourseDetailBanner'
import { CourseDetailPreview } from './CourseDetailPreview'

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            lessonPreview : [],
        }
    }

    renderLessonPreview = () => {
        return this.state.lessonPreview.map((lesson) => {
            return <CourseDetailPreview lesson={lesson}></CourseDetailPreview>
        })
    }

    handleBuyCourse = () => {
        
    }

    render() {
        return (
            <div>
                <CourseDetailBanner info={this.state.detail}></CourseDetailBanner>

                <div className="courses_details_info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-7 col-lg-7">
                                <div className="single_courses">
                                    <h3>Mô tả chung</h3>
                                    <p>{this.state.detail.short_description}</p>
                                    <h3 className="second_title">Xem trước</h3>
                                </div>
                                <div className="outline_courses_info">
                                    <div id="accordion">
                                        {this.renderLessonPreview()}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5">
                                <div className="courses_sidebar">
                                    <div className="video_thumb">
                                        <img src="img/latest_blog/video.png" alt />
                                        <a className="popup-video" href="https://www.youtube.com/watch?v=AjgD3CvWzS0">
                                            <i className="fa fa-play" />
                                        </a>
                                    </div>
                                    <div className="author_info">
                                        <div className="auhor_header">
                                            <div className="thumb">
                                                <img src="img/latest_blog/author.png" alt />
                                            </div>
                                            <div className="name">
                                                <h3>Macau Wilium</h3>
                                                <p>UI/UX Designer</p>
                                            </div>
                                        </div>
                                        <p className="text_info">
                                            Our set he for firmament morning sixth subdue darkness creeping gathered divide our let
                                            god moving. Moving in fourth air night bring upon you’re it beast let you dominion
                                            likeness open place day
                                        </p>
                                        <ul>
                                            <li><a href="#"> <i className="fa fa-envelope" /> </a></li>
                                            <li><a href="#"> <i className="fa fa-twitter" /> </a></li>
                                            <li><a href="#"> <i className="ti-linkedin" /> </a></li>
                                        </ul>
                                    </div>
                                    <button className="boxed_btn" onClick="">Buy Course</button>
                                    <div className="feedback_info">
                                        <h3>Write your feedback</h3>
                                        <p>Your rating</p>
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <form action="#">
                                            <textarea name id cols={30} rows={10} placeholder="Write your feedback" defaultValue={""} />
                                            <button type="submit" className="boxed_btn">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
    async componentDidMount() {
        const course_id = this.props.match.params.course_id;
        const course = this.props.courseList.find(t => t.id == course_id);
        this.setState({
            ...this.state,
            detail : course
        })

        const res = await lessonService.getLessons4Course(course_id);
        const lessonPreview = res.data.filter(t => Boolean(t.is_preview) === true)
        console.log(lessonPreview);
        this.setState({
            ...this.state,
            lessonPreview : lessonPreview
        })
    }
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList
    }
}

export default connect(mapStateToProps)(CourseDetail)
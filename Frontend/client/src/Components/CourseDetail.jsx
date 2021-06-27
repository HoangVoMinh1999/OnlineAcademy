import React, { Component } from 'react'
import { connect } from 'react-redux'
import { lessonService, purchaseCourseService } from '../Services';
import CourseDetailBanner from './CourseDetailBanner'
import { CourseDetailPreview } from './CourseDetailPreview'
import swal from 'sweetalert';
import createAction from '../Redux/Action';
import { GET_PURCHASED_COURSE_LIST } from '../Redux/Action/type';

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            lessonPreview : [],
            short_description : '',
        }
    }

    renderLessonPreview = () => {
        return this.state.lessonPreview.map((lesson) => {
            return <CourseDetailPreview lesson={lesson}></CourseDetailPreview>
        })
    }

    renderBuyCourseButton = () => {
        const course_id = this.props.match.params.course_id;
        const course = this.props.purchasedCourseList.find(t => t.course_id.toString() === course_id.toString());
        if (course){
            return <button className="boxed_btn btn-danger" onClick={this.cancelCourse}>Hủy khóa học</button>
        }
        return <button className="boxed_btn" onClick={this.buyCourse}>Mua khóa học</button>
    }

    buyCourse = (event) => {
        event.preventDefault();
        swal("Bạn có chắc chắn muốn mua khóa học này không ???", {
            buttons: {
              cancel: "Quay lại",
              purchase: "Đồng ý",
            },
          })
          .then(async (value) => {
            switch (value) {
           
              case "purchase":
                const course_id = this.props.match.params.course_id;
                let data = {
                    user_id : localStorage.user_UserId,
                    course_id: course_id,
                }
                let res = await purchaseCourseService.buyCourse4User(data);
                if (!res.data.err_message) {
                    swal("Mua khóa học thành công !!!");
                } 
                else{
                    swal("Mua khóa học không thành công !!!");
                }
                if (localStorage.user_accessToken){
                    const res = await purchaseCourseService.getPurchasedCourse4User(localStorage.user_UserId);
                    this.props.dispatch(
                        createAction(
                            GET_PURCHASED_COURSE_LIST,
                            res.data
                        )
                    )
                }
                break;
           
              default:
            }
          });
    }

    cancelCourse = (event) => {
        event.preventDefault();
        swal("Bạn có chắc chắn muốn hủy khóa học này không ???", {
            buttons: {
              cancel: "Quay lại",
              delete: "Đồng ý",
            },
          })
          .then(async (value) => {
            switch (value) {
           
              case "delete":
                const course_id = this.props.match.params.course_id;
                let data = {
                    user_id : localStorage.user_UserId,
                    course_id: course_id,
                }
                let res = await purchaseCourseService.deleteCourse4User(data);
                if (!res.data.err_message) {
                    swal("Hủy khóa học thành công !!!");
                } 
                else{
                    swal("Hủy khóa học không thành công !!!");
                }
                if (localStorage.user_accessToken){
                    const res = await purchaseCourseService.getPurchasedCourse4User(localStorage.user_UserId);
                    this.props.dispatch(
                        createAction(
                            GET_PURCHASED_COURSE_LIST,
                            res.data
                        )
                    )
                }
                break;
           
              default:
            }
          });
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
                                    <p>{this.state.short_description }</p>
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
                                    {this.renderBuyCourseButton()}
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
        console.log("course_id:"+course_id)
        const course = this.props.courseList.find(t => t.id == course_id);
        console.log("list"+ this.props.courseList);
        console.log(course);
        this.setState({
            ...this.state,
            detail : course,
        })


        const res = await lessonService.getLessons4Course(course_id);
        const lessonPreview = res.data.filter(t => t.is_preview.data[0] === '1')
        this.setState({
            ...this.state,
            lessonPreview : lessonPreview
        })
    }
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList,
        purchasedCourseList : state.PurchasedCourseReducer.PurchasedCourseList,
    }
}

export default connect(mapStateToProps)(CourseDetail)
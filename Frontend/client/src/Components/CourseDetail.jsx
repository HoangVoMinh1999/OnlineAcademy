import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentService, courseService, lessonService, purchaseCourseService } from '../Services';
import CourseDetailBanner from './CourseDetailBanner'
import { CourseDetailPreview } from './CourseDetailPreview'
import createAction from '../Redux/Action';
import { GET_PURCHASED_COURSE_LIST, GET_COMMENT_LIST } from '../Redux/Action/type';
import Comment from './Comment/Comment';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import swal from '@sweetalert/with-react'
import NewComment from './Comment/NewComment';

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            lessonPreview: [],
            short_description: '',
            editorState: EditorState.createEmpty(),
            image: null,
            imageURL: null,
        }
    }

    renderLessonPreview = () => {
        const course_id = this.props.match.params.course_id;
        const isPurchased = this.props.purchasedCourseList.find(t => t.course_id.toString() === course_id.toString()) === undefined ? false : true;
        return this.state.lessonPreview.map((lesson, index) => {
            return <CourseDetailPreview key={index} chapter={index} lesson={lesson} isPurchased={isPurchased}></CourseDetailPreview>
        })
    }

    renderBuyCourseButton = () => {
        const course_id = this.props.match.params.course_id;
        const course = this.props.purchasedCourseList.find(t => t.course_id.toString() === course_id.toString());
        if (course) {
            return <button className="boxed_btn btn-danger" onClick={this.cancelCourse}>Hủy khóa học</button>
        }
        return <button className="boxed_btn" onClick={this.buyCourse}>Mua khóa học</button>
    }

    buyCourse = (event) => {
        event.preventDefault();
        if (!localStorage.user_accessToken) {
            this.props.history.push('/login')
        }
        else {
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
                                user_id: localStorage.user_UserId,
                                course_id: course_id,
                            }
                            let res = await purchaseCourseService.buyCourse4User(data);
                            if (!res.data.err_message) {
                                swal("Mua khóa học thành công !!!");
                            }
                            else {
                                swal("Mua khóa học không thành công !!!");
                            }
                            if (localStorage.user_accessToken) {
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
                            user_id: localStorage.user_UserId,
                            course_id: course_id,
                        }
                        let res = await purchaseCourseService.deleteCourse4User(data);
                        if (!res.data.err_message) {
                            swal("Hủy khóa học thành công !!!");
                        }
                        else {
                            swal("Hủy khóa học không thành công !!!");
                        }
                        if (localStorage.user_accessToken) {
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



    handleAddComment = (event) => {
        event.preventDefault();
        swal("Viết bình luận của bạn về khóa học tại đây:", {
            content: "input",
        }).then(async (value) => {
            this.setState({
                newComment: {
                    ...this.state.newComment,
                    comment: value,
                }
            })
            let data = this.state.newComment;
            data.user_id = localStorage.user_UserId
            data.course_id = this.props.match.params.course_id;
            data.Log_CreatedBy = localStorage.user_username;
            let res = await commentService.addComment4Course(data);
            swal("Cảm ơn bạn đã đánh giá khóa học");
            const course_id = this.props.match.params.course_id;
            res = await commentService.getComments4Course(course_id);
            res.data = res.data.sort((a, b) => new Date(b.Log_UpdatedDate) - new Date(a.Log_UpdatedDate));
            this.props.dispatch(
                createAction(
                    GET_COMMENT_LIST,
                    res.data,
                )
            )
        });
    }

    renderComment = () => {
        return this.props.commentList.map((comment) => {
            return <Comment info={comment}></Comment>
        })
    }
    renderFullDescription = () => {
        return (
            <div>
                <Editor
                    disabled
                    toolbarHidden
                    editorState={this.state.editorState}
                    editorStyle={{ border: "1px solid", backgroundColor: 'white' }}
                />

            </div>
        )
    }

    async componentDidUpdate(nextProps) {
        const course_id = this.props.match.params.course_id;
        if (nextProps.purchasedCourseList !== this.props.purchasedCourseList) {
            if (this.props.purchasedCourseList.find(t => t.course_id.toString() === course_id.toString()) === undefined) {
                let res = await lessonService.getLessons4Course(course_id);
                const lessonPreview = res.data.filter(t => t.is_preview.data[0] === 1)
                this.setState({
                    ...this.state,
                    lessonPreview: lessonPreview
                })
            }
            else {
                let res = await lessonService.getLessons4Course(course_id);
                const lessonPreview = res.data
                this.setState({
                    ...this.state,
                    lessonPreview: lessonPreview
                })
            }
        }
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
                                    <h3>Mô tả chi tiết</h3>
                                    {this.renderFullDescription()}
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
                                        <img src={this.state.imageURL === null ? "/img/courses/1.png" : this.state.imageURL} alt="Hình ảnh khóa học" />
                                    </div>
                                    <div className="author_info" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                        <div className="auhor_header">
                                            <div className="thumb">
                                                <img src="img/latest_blog/author.png" alt />
                                            </div>
                                            <div className="name">
                                                <h3 style={{ color: 'white' }}>Macau Wilium</h3>
                                                <p style={{ color: 'white' }}>UI/UX Designer</p>
                                            </div>
                                        </div>
                                        <p className="text_info" style={{ color: 'white' }}>
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
                                        <div className="m-1 d-flex justify-content-between">
                                            <span>Comment</span>
                                            <button className="btn btn-outline-success" onClick={this.handleAddComment}>Thêm bình luận</button>
                                        </div>
                                        <div className="comment">
                                            {this.renderComment()}
                                        </div>
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
        const blocksFromHtml = htmlToDraft(course.full_description);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
            ...this.state,
            detail: course,
            editorState: editorState
        })

        let res = await courseService.getImage4CourseDetail(course_id);
        if (!res.err_message) {
            var reader = new FileReader();
            if (res.data.size > 0) {
                reader.readAsDataURL(res.data);
                reader.onloadend = () => this.setState({
                    ...this.state,
                    image: reader.result,
                    imageURL: URL.createObjectURL(res.data)
                })
            }
        }
        if (this.props.purchasedCourseList.find(t => t.course_id.toString() === course_id.toString()) === undefined) {
            res = await lessonService.getLessons4Course(course_id);
            const lessonPreview = res.data.filter(t => t.is_preview.data[0] === 1)
            this.setState({
                ...this.state,
                lessonPreview: lessonPreview
            })
        }
        else {
            res = await lessonService.getLessons4Course(course_id);
            const lessonPreview = res.data
            this.setState({
                ...this.state,
                lessonPreview: lessonPreview
            })
        }



        res = await commentService.getComments4Course(course_id);
        res.data = res.data.sort((a, b) => new Date(a.Log_UpdatedDate) - new Date(b.Log_UpdatedDate));
        this.props.dispatch(
            createAction(
                GET_COMMENT_LIST,
                res.data,
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courseList: state.CourseReducer.CourseList,
        purchasedCourseList: state.PurchasedCourseReducer.PurchasedCourseList,
        commentList: state.CommentReducer.CommentList,
    }
}

export default connect(mapStateToProps)(CourseDetail)
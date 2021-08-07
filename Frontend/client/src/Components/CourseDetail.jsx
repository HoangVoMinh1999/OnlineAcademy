import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentService, courseService, lessonService, purchaseCourseService, userService } from '../Services';
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
import CourseItem from './CourseItem';

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
            isAbleToComment: false,
            teacher: {},
            relativeCourse: [],
        }
    }

    renderLessonPreview = () => {
        const course_id = this.props.match.params.course_id;
        const isPurchased = this.props.purchasedCourseList.find(t => t.course_id.toString() === course_id.toString()) === undefined ? false : true;
        if (this.state.lessonPreview.length > 0) {
            return this.state.lessonPreview.map((lesson, index) => {
                return <CourseDetailPreview key={index} chapter={index} lesson={lesson} isPurchased={isPurchased}></CourseDetailPreview>
            })
        }
        return <p>Khóa học chưa có bài học preview</p>
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
                                await courseService.updateStudent(course_id);
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

    renderRelativeCourses = () => {
        if (this.state.relativeCourse.length > 0) {
            return this.state.relativeCourse.map((course, index) => {
                return <div className="col-xl-4 col-lg-4 col-md-6">
                    <CourseItem info={course} key={index} reload='true'></CourseItem>
                </div>
            })
        }
    }

    async componentWillReceiveProps(nextProps) {
        const course_id = this.props.match.params.course_id;
        if (nextProps.purchasedCourseList !== this.props.purchasedCourseList) {
            if (this.props.purchasedCourseList.find(t => t.course_id.toString() === course_id.toString()) === undefined) {
                let res = await lessonService.getLessons4Course(course_id);
                const lessonPreview = res.data.filter(t => t.is_preview.data[0] === 1)
                this.setState({
                    ...this.state,
                    lessonPreview: lessonPreview,
                    isAbleToComment: false,
                })
            }
            else {
                let res = await lessonService.getLessons4Course(course_id);
                const lessonPreview = res.data
                this.setState({
                    ...this.state,
                    lessonPreview: lessonPreview,
                    isAbleToComment: false,
                })
            }
        }
        if (nextProps.match.params !== this.props.match.params) {
            const course_id = nextProps.match.params.course_id;
            const course = nextProps.courseList.find(t => t.id == course_id);
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
                    lessonPreview: lessonPreview,
                    isAbleToComment: false,
                })
            }
            else {
                res = await lessonService.getLessons4Course(course_id);
                const lessonPreview = res.data
                this.setState({
                    ...this.state,
                    lessonPreview: lessonPreview,
                    isAbleToComment: true,
                })
            }

            if (course.teacher_id !== null) {
                const res_teacher = await userService.getUserDetail(course.teacher_id);
                if (!res_teacher.data.err_message) {
                    this.setState({
                        ...this.state,
                        teacher: res_teacher.data
                    })
                }
            }

            res = await commentService.getComments4Course(course_id);
            res.data = res.data.sort((a, b) => new Date(a.Log_UpdatedDate) - new Date(b.Log_UpdatedDate));
            this.props.dispatch(
                createAction(
                    GET_COMMENT_LIST,
                    res.data,
                )
            )

            res = await courseService.getAllCourses({ category: course.category_id });
            if (res.data.length > 0) {
                let relativeCourse = res.data.listCourse.filter(t => t.id.toString() !== course_id.toString() && t.IsFinish.data[0] === 0);
                relativeCourse = relativeCourse.sort((a,b) => b.current_student -a.current_student);
                relativeCourse = relativeCourse.slice(0, 3);
                this.setState({
                    ...this.state,
                    relativeCourse: relativeCourse
                })
            }
            window.scrollTo(0, 0)
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
                                    <div className="author_info" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', fontSize: '17px' }}>
                                        <div className="auhor_header">
                                            <div className="thumb">
                                                <img src="img/latest_blog/author.png" alt />
                                            </div>
                                            <div className="name">
                                                <h3 style={{ color: 'white' }}>{this.state.teacher.name}</h3>
                                                <p style={{ color: 'white' }}></p>
                                            </div>
                                        </div>
                                        <div className="text_info" style={{ color: 'white', margin: '10px' }}>
                                            <div className="col">
                                                <span>Số điện thoại: {this.state.teacher.phone}</span>
                                            </div>
                                            <div className="col">
                                                <span>Email: {this.state.teacher.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {this.renderBuyCourseButton()}
                                    <div className="feedback_info">
                                        <div className="m-1 d-flex justify-content-between">
                                            <span>Comment</span>
                                            <button className="btn btn-outline-success" disabled={!this.state.isAbleToComment} onClick={this.handleAddComment}>Thêm bình luận</button>
                                        </div>
                                        <div className="comment">
                                            {this.renderComment()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '10rem' }}>
                            <div className="single_courses">
                                <h3>Cách khóa học tương tự</h3>
                            </div>
                            <div className="all_courses">
                                <div className="container">
                                    <div className="tab-content" id="myTabContent" >
                                        <div className={`tab-pane fade show active`}  id="relativeCourses" role="tabpanel" aria-labelledby="relativeCourses">
                                            <div className="row">
                                                {this.renderRelativeCourses()}
                                            </div>
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
        await courseService.updateViewCourse(course_id);
        if (this.props.purchasedCourseList.find(t => t.course_id.toString() === course_id.toString()) === undefined) {
            res = await lessonService.getLessons4Course(course_id);
            const lessonPreview = res.data.filter(t => t.is_preview.data[0] === 1)
            this.setState({
                ...this.state,
                lessonPreview: lessonPreview,
                isAbleToComment: false,
            })
        }
        else {
            res = await lessonService.getLessons4Course(course_id);
            const lessonPreview = res.data
            this.setState({
                ...this.state,
                lessonPreview: lessonPreview,
                isAbleToComment: true,
            })
        }

        if (course.teacher_id !== null) {
            const res_teacher = await userService.getUserDetail(course.teacher_id);
            if (!res_teacher.data.err_message) {
                this.setState({
                    ...this.state,
                    teacher: res_teacher.data
                })
            }
        }



        res = await commentService.getComments4Course(course_id);
        res.data = res.data.sort((a, b) => new Date(a.Log_UpdatedDate) - new Date(b.Log_UpdatedDate));
        this.props.dispatch(
            createAction(
                GET_COMMENT_LIST,
                res.data,
            )
        )

        res = await courseService.getAllCourses({ category: course.category_id });
        if (res.data.length > 0) {
            let relativeCourse = res.data.listCourse.filter(t => t.id.toString() !== course_id.toString() && t.IsFinish.data[0] === 0);
            relativeCourse = relativeCourse.slice(0, 3);
            this.setState({
                ...this.state,
                relativeCourse: relativeCourse
            })
        }
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
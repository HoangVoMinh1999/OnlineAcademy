import React, { Component } from 'react'
import swal from 'sweetalert'
import { lessonService } from '../../Services';

export default class LessonAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessonValues: {
                course_id: 0,
                title: '',
                content: '',
                videoURL: '',
            },
            lessonError: {
                title: '',
                content: '',
            }
        }
    }

    //--- Lesson
    handleChangeLesson = (event) => {
        const { name, value } = event.target;
        this.setState({
            lessonValues: { ...this.state.lessonValues, [name]: value }
        })
    }

    handleBlurLesson = (event) => {
        const { name, value } = event.target;
        const errMessage = this.validateDataLesson(name, value);
        this.setState({
            lessonError: { ...this.state.lessonError, [name]: errMessage }
        })
    }

    validateDataLesson = (name, value) => {
        let errMessage = ''
        if (name === 'title') {
            if (!value) {
                errMessage = 'Vui lòng nhập tựa đề bài học !!!';
            }
        }
        else if (name === 'content') {
            if (!value) {
                errMessage = 'Vui lòng nhập nội dung bài học !!!';
            }
        }
        return errMessage;
    }
    handleSubmitLesson = async (event) => {
        event.preventDefault();
        const body = this.state.lessonValues;
        const res = await lessonService.addLesson4Course(body);
        this.setState({
            lessonValues: {
                course_id: this.props.match.params.course_id,
                title: '',
                content: '',
                videoURL: '',
            },
            lessonError: {
                title: '',
                content: '',
            }
        })
        if (!res.data.err_message) {
            swal({
                title: "Chúc mừng",
                text: "Cập nhật khóa học thành công !!!",
                icon: "success",
            });
        }
        else {
            if (res.data.err_message === 'This course is existed') {
                swal({
                    title: "Cảnh báo",
                    text: "Khóa học đã tồn tại",
                    icon: "error",
                });
            }
            else {
                swal({
                    title: "Cảnh báo",
                    text: "Chưa có nội dung cho khóa học",
                    icon: "error",
                });
            }
        }

    }

    renderError = (errMessage) => {
        if (errMessage != '') {
            return <div className="alert alert-danger">{errMessage}</div>
        }
        return ''
    }


    render() {
        return (
            <div>
                <div className="review-content-section">
                    <form onSubmit={this.handleSubmitLesson}>
                        <div className="card-block">
                            <div className="input-group mg-b-15 mg-t-15">
                                <span className="input-group-addon"><i className="icon nalika-user" aria-hidden="true" /></span>
                                <input type="text" className="form-control" name="title" value={this.state.lessonValues.title} placeholder="Tên bài học" onChange={this.handleChangeLesson} onBlur={this.handleBlurLesson} />
                            </div>
                            {this.renderError(this.state.lessonError.title)}
                            <div className="input-group mg-b-15">
                                <span className="input-group-addon"><i className="icon nalika-user" aria-hidden="true" /></span>
                                <textarea className="form-control" name="content" value={this.state.lessonValues.content} cols="30" rows="13" placeholder="Nội dung tóm tắt" onChange={this.handleChangeLesson} onBlur={this.handleBlurLesson}></textarea>
                            </div>
                            {this.renderError(this.state.lessonError.content)}
                            <div className="input-group mg-b-15">
                                <span className="input-group-addon">Cho phép xem review</span>
                                <input type="checkbox" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="text-center custom-pro-edt-ds">
                                    <button type="submit" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Đồng ý</button>
                                    <button type="button" className="btn btn-ctl-bt waves-effect waves-light" onClick={() => this.props.history.goBack()}>Quay lại</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    async componentDidMount() {
        this.setState({
            lessonValues: {
                ...this.state.lessonValues,
                course_id: this.props.match.params.course_id
            }
        })
    }
}





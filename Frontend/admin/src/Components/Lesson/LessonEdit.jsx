import React, { Component } from 'react'
import swal from 'sweetalert'
import { lessonService } from '../../Services';
import ReactPlayer from 'react-player'

export default class LessonEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessonValues: {
                title: '',
                content: '',
                video: null,
                videoURL: null,
                is_preview: false,
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
        if (name === "is_preview") {
            this.setState({ lessonValues: { ...this.state.lessonValues, is_preview: event.target.checked } })
        }
        else {
            this.setState({ lessonValues: { ...this.state.lessonValues, [name]: value } })
        }

        if (name === 'video') {
            this.setState({
                lessonValues: {
                    ...this.state.lessonValues,
                    video: event.target.files[0],
                    videoURL: URL.createObjectURL(event.target.files[0]),
                }
            })
        }
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
        let res_video = null;
        if (body.video !== null) {
            const fd = new FormData();
            fd.append('video', body.video);
            res_video = await lessonService.updateVideo4Lesson(this.props.match.params.id, fd);
        }
        delete body.video;
        delete body.videoURL
        const res = await lessonService.updateLesson4Course(this.props.match.params.id, body);
        if (!res.data.err_message && !res_video.data.err_message) {
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
            if (res_video.data.err_message !== '') {
                swal({
                    title: "Cảnh báo",
                    text: "Video chưa được upload",
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
                    <form onSubmit={this.handleSubmitLesson} encType="multipart/form-data">
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
                                <span className="input-group-addon">Cho phép xem trước</span>
                                <input type="checkbox" name="is_preview" checked={this.state.lessonValues.is_preview} className="form-control" onClick={this.handleChangeLesson} onBlur={this.handleBlurLesson} />
                            </div>
                            <div className="review-content-section">
                                <div className="input-group mg-b-pro-edt">
                                    <span className="input-group-addon"><i className="icon nalika-edit" aria-hidden="true" /></span>
                                    <input type="file" className="form-control" accept="video/mp4,video/x-m4v,video/*" name="video" placeholder="Video" onChange={this.handleChangeLesson} />
                                </div>
                                <ReactPlayer
                                    url={this.state.lessonValues.videoURL}
                                    width='100%'
                                    controls={true}

                                />
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
        const res = await lessonService.getLessonById(this.props.match.params.id);
        this.setState({
            lessonValues: {
                title: res.data.title,
                content: res.data.content,
                videoURL: res.data.videoURL,
                is_preview: res.data.is_preview.data[0] === 1 ? true : false,
            },
            lessonError: {
                title: '',
                content: '',
            }
        })
        const video = await lessonService.getVideo4Lesson(this.props.match.params.id);
        if (!video.err_message) {
            var fr = new FileReader();
            fr.readAsDataURL(video.data);
            fr.onloadend = () => this.setState({
                ...this.state,
                lessonValues: {
                    ...this.state.lessonValues,
                    video: video.data,
                    videoURL: URL.createObjectURL(video.data),
                }
            })
        }
    }
}





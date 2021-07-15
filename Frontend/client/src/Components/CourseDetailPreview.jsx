import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal';
import ReactPlayer from 'react-player'
import { lessonService } from '../Services';

export class CourseDetailPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            video: null,
            videoURL: null,

        }
    }


    handleOpen = (event) => {
        this.setState({
            ...this.state,
            isOpen: true,
        })
    }

    handleClose = (event) => {
        this.setState({
            ...this.state,
            isOpen: false,
        })
    }

    renderVideoButton = () => {
        if (this.props.isPurchased) {
            return (
                <div className="align-self-center p-4">
                    <button class="genric-btn primary radius" onClick={this.handleOpen}>Xem video</button>
                    <Modal
                        open={this.state.isOpen}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={
                            {
                                position: 'absolute',
                                width: 1000,
                                top: `50%`,
                                left: `50%`,
                                transform: `translate(-50%, -50%)`,
                                backgroundColor: 'white',
                                border: '2px solid #000',
                                padding: 4,

                            }} >
                            <ReactPlayer
                                url={this.state.videoURL}
                                width='100%'
                                controls={true}

                            />
                        </div>
                    </Modal>
                </div>
            )
        }
        return (
            <div>
                <small>Chưa thể xem video của bài học</small>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="card d-flex flex-column">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" data-toggle="collapse" data-target={`#${this.props.lesson.id}`} aria-expanded="false" aria-controls={this.props.lesson.id}>
                                <i className="flaticon-question" /> {this.props.lesson.title}
                            </button>
                        </h5>
                    </div>
                    <div id={this.props.lesson.id} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            {this.props.lesson.content}
                        </div>
                    </div>
                    {this.renderVideoButton()}
                </div>
            </div>
        )
    }

    async componentDidMount() {
        const res = await lessonService.getVideo4Lesson(this.props.lesson.id);
        if (!res.err_message) {
            if (res.data.size > 0) {
                var reader = new FileReader();
                reader.readAsDataURL(res.data);
                reader.onloadend = () => this.setState({
                    ...this.state,
                    video: reader.result,
                    videoURL: URL.createObjectURL(res.data)
                })
            }
        }
    }
}
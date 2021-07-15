import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal';
import ReactPlayer from 'react-player'

export class CourseDetailPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
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
                                width: 400,
                                top: `50%`,
                                left: `50%`,
                                transform: `translate(-50%, -50%)`,
                                backgroundColor: 'white',
                                border: '2px solid #000',
                                padding: 4,

                            }} >
                            <h2 id="simple-modal-title">Text in a modal</h2>
                            <p id="simple-modal-description">
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </p>
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
}
import React, { Component } from 'react'

export class CourseDetailPreview extends Component {
    chapter = '#'+this.props.chapter;
    render() {
        return (
            <div>
                <div className="card">
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
                </div>
            </div>
        )
    }
}
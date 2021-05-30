import React, { Component } from 'react'

export class CourseDetailPreview extends Component {
    chapter = '#'+this.props.chapter;
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" data-toggle="collapse" data-target={this.chapter} aria-expanded="false" aria-controls="collapseTwo">
                                <i className="flaticon-question" /> Is WordPress hosting worth it?
                            </button>
                        </h5>
                    </div>
                    <div id={this.props.chapter} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                            let god moving. Moving in fourth air night bring upon
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
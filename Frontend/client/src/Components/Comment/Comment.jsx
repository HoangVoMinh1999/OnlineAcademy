import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        return (
            <div className="card">
                <h5 className="card-header">{this.props.info.username}</h5>
                <div className="card-body">
                    <h5 className="card-title">
                        <i className="flaticon-mark-as-favorite-star" />
                        <i className="flaticon-mark-as-favorite-star" />
                        <i className="flaticon-mark-as-favorite-star" />
                        <i className="flaticon-mark-as-favorite-star" />
                        <i className="flaticon-mark-as-favorite-star" />
                    </h5>
                    <p className="card-text">{this.props.info.comment}</p>
                </div>
            </div>
        )
    }
}
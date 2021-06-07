import React, { Component } from 'react'
import { connect } from 'react-redux'

class CourseItem extends Component {
    render() {
        const category = this.props.categoryList.find(t => t.id === this.props.info.category_id)
        return (
            <div>
                <div className="single_courses">
                    <div className="thumb">
                        <a href="#">
                            <img src="img/courses/1.png" alt />
                        </a>
                    </div>
                    <div className="courses_info">
                        <span>{category.name}</span>
                        <h3><a href="#">{this.props.info.name}</a></h3>
                        <div className="star_prise d-flex justify-content-between">
                            <div className="star">
                                <i className="flaticon-mark-as-favorite-star" />
                                <span>({this.props.info.rate})</span>
                            </div>
                            <div className="prise">
                                {this.props.sale === 0 ? <span className="offer">{this.props.info.price} VND</span> : <p></p>}
                                <p>
                                    <span className="active_prise">
                                        {this.props.info.price - this.props.info.price * this.props.info.sale / 100} VND
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList : state.CategoryReducer.ChildCategoryList
    }
}

export default connect(mapStateToProps)(CourseItem);
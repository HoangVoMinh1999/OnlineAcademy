import React, { Component } from 'react'
import { connect } from 'react-redux'

class CourseDetailBanner extends Component {
    render() {
        const category = this.props.categoryList.find(t => t.id === this.props.info.category_id)
        return (
            <div>
                {/* bradcam_area_start */}
                <div className="courses_details_banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="course_text">
                                    <h3>{this.props.info.name}</h3>
                                    <div className="prise">
                                        <span className="inactive">{this.props.info.price} VND</span>
                                        <span className="active">{this.props.info.price - this.props.info.price*this.props.info.sale/100} VND</span>
                                    </div>
                                    <div className="rating">
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <span>{this.props.info.rate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* bradcam_area_end */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        categoryList : state.CategoryReducer.ChildCategoryList,
    }
}

export default connect(mapStateToProps)(CourseDetailBanner)
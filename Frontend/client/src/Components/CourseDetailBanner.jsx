import React, { Component } from 'react'
import { connect } from 'react-redux'


class CourseDetailBanner extends Component {

    constructor(props){
        super(props);
        this.state = {
            detail : {},
        }
    }

    com


    render() {
        let isCompleted = null;
        if (this.props.hasOwnProperty('IsCompleted')){
            isCompleted = this.state.detail.IsCompleted.data[0] === 1 ? "Đã hoàn thiện": "Chưa hoàn thiện";
        }
        return (
            <div>
                {/* bradcam_area_start */}
                <div className="courses_details_banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="course_text">
                                    <h3>{this.props.info.name} </h3>
                                    <h4 style={{color: 'aqua'}}>({this.props.info.view} Lượt xem)</h4>
                                    <div className="prise">
                                        <span className="inactive">{this.props.info.price} VND</span>
                                        <span className="active">{this.props.info.price - this.props.info.price * this.props.info.sale / 100} VND</span>
                                    </div>
                                    <div className="rating">
                                        <p >
                                            <i className="flaticon-user" style={{fontSize:'25px'}}/>
                                            <span style={{fontSize:'25px'}} >{this.props.info.current_student}</span>
                                        </p>
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <i className="flaticon-mark-as-favorite-star" />
                                        <span>{this.props.info.rate}</span>
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'white' }}>Mô tả chung</h4>
                                        <div className="rating">
                                            <span>{this.props.info.short_description === '' ? 'Không có ghi chú' : this.props.info.short_description}</span>
                                        </div>
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
    componentDidMount(){
        const course = this.props.courseList.find(t => t.id == this.props.info.id);
        this.setState({
            detail : course,
        })
        window.scrollTo(0,0)
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.ChildCategoryList,
        courseList: state.CourseReducer.CourseList,
    }
}

export default connect(mapStateToProps)(CourseDetailBanner)
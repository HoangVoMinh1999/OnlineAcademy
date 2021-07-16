import React, { Component } from 'react'
import { PopularCourse } from '../Components/PopularCourse'
import { Slider } from '../Components/Slider'
import createAction from '../Redux/Action'
import { GET_CATEGORY_LIST, GET_COURSE_LIST } from '../Redux/Action/type'
import { categoryService, courseService } from '../Services/index'
import { connect } from 'react-redux'

class HomePage extends Component {

    render() {
        return (
            <div>
                <Slider></Slider>
                <PopularCourse></PopularCourse>
            </div>
        )
    }
    async componentDidMount() {
        const res_category = await categoryService.getAllCategory();
        this.props.dispatch(
            createAction(
                GET_CATEGORY_LIST,
                res_category.data.listCategory
            )
        )

        const res_course = await courseService.getAllCourses();
        await res_course.data.listCourse.forEach( async (element) => {
            element.image = null;
            element.imageURL = null;
            delete element.Image_Source;
        })
        this.props.dispatch(
            createAction(
                GET_COURSE_LIST,
                res_course.data.listCourse
            )
        )
    }
}


const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.CategoryList
    }
}

export default connect(mapStateToProps)(HomePage)
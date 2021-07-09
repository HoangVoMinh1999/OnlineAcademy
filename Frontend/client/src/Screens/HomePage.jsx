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
                res_category.data
            )
        )

        const res_course = await courseService.getAllCourse();
        await res_course.data.forEach( async (element) => {
            element.image = null;
            element.imageURL = null;
            delete element.Image_Source;
            const res = await courseService.getImage4CourseDetail(element.id);
            if (!res.data.err_message){
                var reader = new FileReader();
                if (res.data.size > 0){
                    reader.readAsDataURL(res.data); 
                    reader.onloadend = function() {
                        var base64data = reader.result;                
                        element.image = base64data;
                        var url = URL.createObjectURL(res.data);
                        element.imageURL = url;
                    }
                }
                else{
                    element.image = null;
                    element.imageURL = null;
                }
            }
        })
        this.props.dispatch(
            createAction(
                GET_COURSE_LIST,
                res_course.data
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
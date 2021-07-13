import React, { Component } from 'react'
import createAction from '../../Redux/Action';
import { GET_COURSE_LIST, GET_LIST, GET_USER_LIST } from '../../Redux/Action/type';
import { categoryService, courseService, userService } from '../../Services';
import { connect } from 'react-redux'

class Homepage extends Component {
    render() {
        return (
            <div>
                <h1>ĐÂY LÀ TRANG QUẢN LÝ</h1>
            </div>
        )
    }
    async componentDidMount(){
        let res = await categoryService.getAllCategories();
        this.props.dispatch(
            createAction(
                GET_LIST,
                res.data
            )
        )
        let res_course = await courseService.getAllCourses();
        this.props.dispatch(
            createAction(
                GET_COURSE_LIST,
                res_course.data.listCourse
            )
        )
        const res_user = await userService.getAllUser();
        this.props.dispatch(
            createAction(
                GET_USER_LIST,
                res_user.data,
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.UserReducer.UserList,
    }
}

export default connect(mapStateToProps)(Homepage)

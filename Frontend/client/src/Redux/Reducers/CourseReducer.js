import { GET_COURSE_LIST } from "../Action/type";

const stateCourse = {
    CourseList : []
}

export const CourseReducer = (state = stateCourse, action) => {
    switch(action.type){
        case GET_COURSE_LIST:{
            state.CourseList = action.payload
            return {...state}
        }
    }
    return {...state};
}
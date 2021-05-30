import { GET_COURSE_LIST } from "../Action/type"

const stateCourse = {   
    CourseList : [],
}

export const CourseReducer = (state = stateCourse, action) => {
    switch (action.type) {
        case GET_COURSE_LIST : {
            let courseList = [...state.CourseList];
            console.log(action.payload)
            courseList = action.payload;
            state.CourseList = courseList

            return {...state}
        }
    }
    return {...state}
}
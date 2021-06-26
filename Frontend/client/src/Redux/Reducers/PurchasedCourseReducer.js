import { GET_PURCHASED_COURSE_LIST } from "../Action/type"

const PurchasedCourseState = {
    CourseList : [],
}


export const PurchasedCourseReducer = (state = PurchasedCourseState, action) => {
    switch(action.type){
        case GET_PURCHASED_COURSE_LIST:{
            let courseList = state.CourseList;
            courseList = action.payload;
            state.CourseList = courseList;
            return {...state};
        }
    }
    return {...state};
}
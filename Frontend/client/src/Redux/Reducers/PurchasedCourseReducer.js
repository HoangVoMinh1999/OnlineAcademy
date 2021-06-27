import { GET_PURCHASED_COURSE_LIST } from "../Action/type"

const PurchasedCourseState = {
    PurchasedCourseList : [],
}


export const PurchasedCourseReducer = (state = PurchasedCourseState, action) => {
    switch(action.type){
        case GET_PURCHASED_COURSE_LIST:{
            let courseList = state.PurchasedCourseList;
            courseList = action.payload;
            state.PurchasedCourseList = courseList;
            return {...state};
        }
    }
    return {...state};
}
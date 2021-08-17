import { GET_COURSE_LIST, GET_SUGGESTED_COURSE_LIST } from "../Action/type";

const stateCourse = {
    CourseList : [],
    SuggestedCourseList : []
}

export const CourseReducer = (state = stateCourse, action) => {
    switch(action.type){
        case GET_COURSE_LIST:{
            state.CourseList = action.payload;
            return {...state}
        }
        case GET_SUGGESTED_COURSE_LIST:{
            let cList = action.payload;
            cList.sort((a,b) => b.rate - a.rate);
            for(var i = 0;i<6;i++){
                cList[i].specialPoint = "Suggested";
            }
            cList = cList.slice(0,7);
            state.SuggestedCourseList = cList;
            return{...state};
        }
    }
    return {...state};
}
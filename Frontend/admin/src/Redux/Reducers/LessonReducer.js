import { GET_LESSON_LIST } from "../Action/type"

const stateLesson = {
    LessonList : [],
}

export const LessonReducer = (state = stateLesson,action) => {
    switch (action.type){
        case GET_LESSON_LIST : {
            let lessonList = [...state.LessonList];
            lessonList = action.payload;
            state.LessonList = lessonList;

            return {...state};
        }
    }
    return {...state};
}
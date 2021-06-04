import {combineReducers} from 'redux'
import {CategoryReducer} from './CategoryReducer'
import {CourseReducer} from './CourseReducer'
import {LessonReducer} from './LessonReducer'

export const rootReducer = combineReducers ({
    CategoryReducer,
    CourseReducer,
    LessonReducer,
});
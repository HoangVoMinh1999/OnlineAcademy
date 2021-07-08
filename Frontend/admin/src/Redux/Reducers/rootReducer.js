import {combineReducers} from 'redux'
import {CategoryReducer} from './CategoryReducer'
import {CourseReducer} from './CourseReducer'
import {LessonReducer} from './LessonReducer'
import {UserReducer} from './UserReducer'

export const rootReducer = combineReducers ({
    CategoryReducer,
    CourseReducer,
    LessonReducer,
    UserReducer,
});
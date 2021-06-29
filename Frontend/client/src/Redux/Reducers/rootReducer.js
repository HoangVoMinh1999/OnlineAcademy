import {combineReducers} from 'redux'
import {CategoryReducer} from './CategoryReducer'
import {CourseReducer} from './CourseReducer'
import {PurchasedCourseReducer} from './PurchasedCourseReducer'
import { CommentReducer } from './CommentReducer'

export const rootReducer = combineReducers({
    CategoryReducer,
    CourseReducer,
    PurchasedCourseReducer,
    CommentReducer,
});
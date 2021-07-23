import {combineReducers} from 'redux'
import {CategoryReducer} from './CategoryReducer'
import {CourseReducer} from './CourseReducer'
import {PurchasedCourseReducer} from './PurchasedCourseReducer'
import { CommentReducer } from './CommentReducer'
import { WatchListReducer } from './WatchListReducer'

export const rootReducer = combineReducers({
    CategoryReducer,
    CourseReducer,
    PurchasedCourseReducer,
    CommentReducer,
    WatchListReducer,
});
import {combineReducers} from 'redux'
import {CategoryReducer} from './CategoryReducer'
import {CourseReducer} from './CourseReducer'
import {PurchasedCourseReducer} from './PurchasedCourseReducer'

export const rootReducer = combineReducers({
    CategoryReducer,
    CourseReducer,
    PurchasedCourseReducer,
});
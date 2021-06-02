import {combineReducers} from 'redux'
import {CategoryReducer} from './CategoryReducer'
import {CourseReducer} from './CourseReducer'

export const rootReducer = combineReducers({
    CategoryReducer,
    CourseReducer,
});
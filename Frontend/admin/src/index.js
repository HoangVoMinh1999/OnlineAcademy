import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CourseList from './Layouts/Course/CourseList'
import CategoryList from './Layouts/Category/CategoryList'

import {rootReducer} from './Redux/Reducers/rootReducer'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

const store = createStore(rootReducer);
ReactDOM.render(
  <Provider store = {store}>
    <CategoryList></CategoryList>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { Component } from 'react';
import CategoryAdd from './Components/Category/CategoryAdd';
import Homepage from './Screens/Homepage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LeftMenu from './Components/leftMenu';
import Header from './Components/Header';
import Footer from './Components/Footer';
import CategoryList from './Components/Category/CategoryList';
import { appendScript } from './utils/appendScript';
import CategoryEdit from './Components/Category/CategoryEdit';
import CourseList from './Components/Course/CourseList';
import CourseAdd from './Components/Course/CourseAdd';
import CourseEdit from './Components/Course/CourseEdit';
import LessonAdd from './Components/Lesson/LessonAdd';
import LessonEdit from './Components/Lesson/LessonEdit';
import UserList from './Components/User/UserList';
import TeacherList from './Components/User/TeacherList';
import StudentList from './Components/User/StudentList';
import AdminList from './Components/User/AdminList';
class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <LeftMenu />
          <div className="all-content-wrapper">
            <div>
              <Header></Header>
            </div>
            <div id='App-Content'>
              <Switch>
                <Route path="/" exact component={Homepage} />

                <Route path="/category-list" component={CategoryList} />
                <Route path="/category-add" component={CategoryAdd} />
                <Route path="/category-edit/:id" component={CategoryEdit}></Route>

                <Route path="/course-list" component={CourseList}></Route>
                <Route path="/course-add" component={CourseAdd}></Route>
                <Route path="/course-edit/:id" component={CourseEdit}></Route>
              
                <Route path="/lesson-add/:course_id" component={LessonAdd}></Route>
                <Route path="/lesson-edit/:id" component={LessonEdit}></Route>

                <Route path="/user/all-user" component={UserList}></Route>
                <Route path="/user/student" component={StudentList}></Route>
                <Route path="/user/teacher" component={TeacherList}></Route>
                <Route path="/user/admin" component={AdminList}></Route>
              </Switch>
            </div>
            <div>
              <Footer></Footer>
            </div>
          </div>
        </Router>

      </div>
    );
  }
  componentDidMount() {

    appendScript('js/vendor/modernizr-2.8.3.min.js');

    appendScript("js/vendor/jquery-1.12.4.min.js");

    appendScript("js/bootstrap.min.js");

    appendScript("js/wow.min.js");

    appendScript("js/jquery-price-slider.js");

    appendScript("js/jquery.meanmenu.js");

    appendScript("js/owl.carousel.min.js");

    appendScript("js/jquery.sticky.js");

    appendScript("js/jquery.scrollUp.min.js");

    appendScript("js/scrollbar/jquery.mCustomScrollbar.concat.min.js");
    appendScript("js/scrollbar/mCustomScrollbar-active.js");

    appendScript("js/metisMenu/metisMenu.min.js");
    appendScript("js/metisMenu/metisMenu-active.js");

    appendScript("js/sparkline/jquery.sparkline.min.js");
    appendScript("js/sparkline/jquery.charts-sparkline.js");
    appendScript("js/calendar/moment.min.js");
    appendScript("js/calendar/fullcalendar.min.js");
    appendScript("js/calendar/fullcalendar-active.js");
    appendScript("js/flot/jquery.flot.js");
    appendScript("js/flot/jquery.flot.resize.js");
    appendScript("js/flot/curvedLines.js");
    appendScript("js/flot/flot-active.js");
    appendScript("js/plugins.js");

    appendScript("js/main.js");
  }

}
export default App;
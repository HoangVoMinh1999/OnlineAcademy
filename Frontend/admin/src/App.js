import React, { Component } from 'react';
import CategoryAdd from './Components/Category/CategoryAdd';
import Homepage from './Screens/Homepage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LeftMenu from './Components/leftMenu';
import Header from './Components/Header';
import Footer from './Components/Footer';
import CategoryList from './Components/Category/CategoryList';
import { appendScript } from './utils/appendScript';
import CourseInfo from './Components/Course/CourseInfo';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <LeftMenu />
          <div class="all-content-wrapper">
            <Header></Header>
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/category-list" component={CategoryList} />
              <Route path="/category-add" component={CourseInfo} />
            </Switch>
            <Footer></Footer>
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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { appendScript } from './utils/appendScript';
import { Component } from 'react';
import Header from './Components/Header';
import { Footer } from './Components/Footer';
import HomePage from './Screens/HomePage';
import { Slider } from './Components/Slider';
import CourseListByCategory from './Screens/CourseListByCategoryId';
import CourseDetail from './Components/CourseDetail';
import { LoginModal } from "./Components/LoginModal";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import { UserDetail } from "./Components/UserDetail";
import './App.css'
import ChangePassword from "./Components/ChangePassword";
import WatchList from "./Screens/WatchList";
import PurchasedCourse from "./Screens/PurchasedCourse";
class App extends Component {
  render() {
    return (
      <div>
        <Router>


          <Header></Header>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/course/:category_id" component={CourseListByCategory}></Route>
            <Route path="/course_detail/:course_id" component={CourseDetail}></Route>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/user_detail" exact component={UserDetail}></Route>
            <Route path="/change-password" exact component={ChangePassword}></Route>
            <Route path="/watchlist" exact component={WatchList}></Route>
            <Route path="/purchasedcourse" exact component={PurchasedCourse}></Route>
          </Switch>
          <Footer></Footer>



        </Router>
      </div >
    )
  }

  componentDidMount() {

    appendScript("js/vendor/modernizr-3.5.0.min.js");
    appendScript("js/vendor/jquery-1.12.4.min.js");
    appendScript("js/popper.min.js");
    appendScript("js/bootstrap.min.js");
    appendScript("js/owl.carousel.min.js");
    appendScript("js/isotope.pkgd.min.js");
    appendScript("js/ajax-form.js");
    appendScript("js/waypoints.min.js");
    appendScript("js/jquery.counterup.min.js");
    appendScript("js/imagesloaded.pkgd.min.js");
    appendScript("js/scrollIt.js");
    appendScript("js/jquery.scrollUp.min.js");
    appendScript("js/wow.min.js");
    appendScript("js/nice-select.min.js");
    appendScript("js/jquery.slicknav.min.js");
    appendScript("js/jquery.magnific-popup.min.js");
    appendScript("js/plugins.js");
    appendScript("js/gijgo.min.js");

    appendScript("js/contact.js");
    appendScript("js/jquery.ajaxchimp.min.js");
    appendScript("js/jquery.form.js");
    appendScript("js/jquery.validate.min.js");
    appendScript("js/mail-script.js");

    appendScript("js/main.js");
  }
}

export default App;

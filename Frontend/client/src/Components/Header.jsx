import React, { Component } from 'react'
import { LoginModal } from './LoginModal'
import { connect } from 'react-redux'
import { Link,Redirect, useHistory} from 'react-router-dom'
import { purchasedCourseService } from '../Services'
import createAction from '../Redux/Action'
import { GET_PURCHASED_COURSE_LIST } from '../Redux/Action/type'

class Header extends Component {


    renderMainCategory = () => {
        return this.props.mainCategoryList.map((category, index) => {
            return <li key={index}><Link to={`/course/${category.id}`}>{category.name}</Link></li>
        })
    }

    renderLogin = () => {
        if (!localStorage.user_accessToken) {
            return (
                <div>
                    <div className="log_chat_area d-flex align-items-center">
                        < Link to="/login" className="login">
                            <i className="flaticon-user" />
                            <span>Đăng nhập / Đăng ký</span>
                        </Link>
                    </div>
                </div>
            )
        }
        else {
            console.log(localStorage);
            return (
                <div>
                    <div className="main-menu  d-none d-lg-block">
                        <nav>
                            <ul id="navigation">
                                <li><a href="#">{localStorage.user_username} <i className="ti-angle-down" /></a>
                                    <ul className="submenu">
                                        <li><Link to="/user_detail">Thông tin cá nhân</Link></li>
                                        <li><Link to="/watchlist" > Khóa học yêu thích</Link></li>
                                        <li><Link to="/purchasedcourse">Khóa học đã mua</Link></li>
                                        <li onClick={this.handleLogout}><Link to="/" > Đăng xuất</Link></li>
                                    </ul>
                                </li>
                                <li><a style={{display:localStorage.user_IsAdmin.toString() === "true" ? "block" : "none"}} href="https://hoangduy-online-academy-admin.netlify.app/">Đến trang admin</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )
        }
    }

    handleLogout = (event) => {
        event.preventDefault();
        delete localStorage.user_accessToken ;
        delete localStorage.user_UserId;
        delete localStorage.user_username;
        delete localStorage.user_IsAdmin;
        this.forceUpdate()
    }
    

    render() {
        return (
            <div>
                {/* header-start */}
                <header>
                    <div className="header-area ">
                        <div id="sticky-header" className="main-header-area">
                            <div className="container-fluid p-0">
                                <div className="row align-items-center no-gutters">
                                    <div className="col-xl-2 col-lg-2">
                                        <div className="logo-img">
                                            <Link to="/">
                                                <img src="img/logo.png" alt />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-lg-7">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link className="active" to="/" >home</Link></li>
                                                    <li><a href="#">Course <i className="ti-angle-down" /></a>
                                                        <ul className="submenu">
                                                            {this.renderMainCategory()}
                                                        </ul>
                                                    </li>
                                                    <li><a href="about.html">About</a></li>
                                                    <li><a href="contact.html">Contact</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                                        {this.renderLogin()}
                                    </div>
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* header-end */}
            </div>
        )
    }
    async componentDidMount(){
        if (localStorage.user_accessToken){
            const res = await purchasedCourseService.getPurchasedCourse4User(localStorage.user_UserId);
            this.props.dispatch(
                createAction(
                    GET_PURCHASED_COURSE_LIST,
                    res.data
                )
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        mainCategoryList: state.CategoryReducer.MainCategoryList
    }
}

export default connect(mapStateToProps)(Header);
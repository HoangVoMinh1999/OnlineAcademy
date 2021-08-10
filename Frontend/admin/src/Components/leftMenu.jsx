import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LeftMenu extends Component {
    render() {
        return (
            <div>
                <div className="left-sidebar-pro">
                    <nav id="sidebar" className>
                        <div className="sidebar-header">
                            <Link to="/"><img className="main-logo" src="img/logo/logo.png" alt /></Link>
                            <strong><img src="img/logo/logosn.png" alt /></strong>
                        </div>
                        <div className="nalika-profile">
                            <div className="profile-dtl">
                                <a href="#"><img src="img/notification/4.jpg" alt /></a>
                                <h2>Lakian <span className="min-dtn">Das</span></h2>
                            </div>
                            <div className="profile-social-dtl">
                                <ul className="dtl-social">
                                    <li><a href="#"><i className="icon nalika-facebook" /></a></li>
                                    <li><a href="#"><i className="icon nalika-twitter" /></a></li>
                                    <li><a href="#"><i className="icon nalika-linkedin" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="left-custom-menu-adp-wrap comment-scrollbar">
                            <nav className="sidebar-nav left-sidebar-menu-pro">
                                <ul className="metismenu" id="menu1">
                                    <li className="active">
                                        <a className="has-arrow" href="index.html">
                                            <i className="icon nalika-home icon-wrap" />
                                            <span className="mini-click-non">QL Khóa Học</span>
                                        </a>
                                        <ul className="submenu-angle" aria-expanded="true">
                                            <li><Link to="/category-list"><span className="mini-sub-pro">Loại khóa học</span></Link></li>
                                            <li><Link to="/course-list?page=1"><span className="mini-sub-pro">Khóa học</span></Link></li>
                                        </ul>
                                    </li>
                                    <li disabled={true}>
                                        <a className="has-arrow" href="mailbox.html" aria-expanded="false"><i className="icon nalika-mail icon-wrap" /> <span className="mini-click-non">QL Tài Khoản</span></a>
                                        <ul className="submenu-angle" aria-expanded="false">
                                            <li><Link to="/user/all-user"><span className="mini-sub-pro">Tất cả tài khoản</span></Link></li>
                                            <li><Link to="/user/student"><span className="mini-sub-pro">Students</span></Link></li>
                                            <li><Link to="/user/teacher"><span className="mini-sub-pro">Teachers</span></Link></li>
                                            <li><Link to="/user/admin"><span className="mini-sub-pro">Admin</span></Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}
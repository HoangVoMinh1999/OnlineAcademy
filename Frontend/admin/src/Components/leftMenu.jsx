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
                                            <span className="mini-click-non">Course List</span>
                                        </a>
                                        <ul className="submenu-angle" aria-expanded="true">
                                            <li><Link title="Category" to="/category-list"><span className="mini-sub-pro">Category</span></Link></li>
                                            <li><Link title="Product List" to="/course-list"><span className="mini-sub-pro">Courses</span></Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a className="has-arrow" href="mailbox.html" aria-expanded="false"><i className="icon nalika-mail icon-wrap" /> <span className="mini-click-non">Accout List</span></a>
                                        <ul className="submenu-angle" aria-expanded="false">
                                            <li><a title="Inbox" href="mailbox.html"><span className="mini-sub-pro">Students</span></a></li>
                                            <li><a title="View Mail" href="mailbox-view.html"><span className="mini-sub-pro">Teachers</span></a></li>
                                            <li><a title="Compose Mail" href="mailbox-compose.html"><span className="mini-sub-pro">Admin</span></a></li>
                                        </ul>
                                    </li>
                                    <li id="removable">
                                        <a className="has-arrow" href="#" aria-expanded="false"><i className="icon nalika-new-file icon-wrap" /> <span className="mini-click-non">Pages</span></a>
                                        <ul className="submenu-angle" aria-expanded="false">
                                            <li><a title="Login" href="login.html"><span className="mini-sub-pro">Login</span></a></li>
                                            <li><a title="Register" href="register.html"><span className="mini-sub-pro">Register</span></a></li>
                                            <li><a title="Lock" href="lock.html"><span className="mini-sub-pro">Lock</span></a></li>
                                            <li><a title="Password Recovery" href="password-recovery.html"><span className="mini-sub-pro">Password Recovery</span></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </nav>
                </div>

                {/* Mobile Menu start */}
                <div>
                    <div className="mobile-menu-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="mobile-menu">
                                        <nav id="dropdown">
                                            <ul className="mobile-menu-nav">
                                                <li><a data-toggle="collapse" data-target="#Charts" href="#">Home <span className="admin-project-icon nalika-icon nalika-down-arrow" /></a>
                                                    <ul className="collapse dropdown-header-top">
                                                        <li><a href="index.html">Dashboard v.1</a></li>
                                                        <li><a href="index-1.html">Dashboard v.2</a></li>
                                                        <li><a href="index-3.html">Dashboard v.3</a></li>
                                                    </ul>
                                                </li>
                                                <li><a data-toggle="collapse" data-target="#demo" href="#">Mailbox <span className="admin-project-icon nalika-icon nalika-down-arrow" /></a>
                                                    <ul id="demo" className="collapse dropdown-header-top">
                                                        <li><a href="mailbox.html">Inbox</a>
                                                        </li>
                                                        <li><a href="mailbox-view.html">View Mail</a>
                                                        </li>
                                                        <li><a href="mailbox-compose.html">Compose Mail</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a data-toggle="collapse" data-target="#Pagemob" href="#">Pages <span className="admin-project-icon nalika-icon nalika-down-arrow" /></a>
                                                    <ul id="Pagemob" className="collapse dropdown-header-top">
                                                        <li><a href="login.html">Login</a>
                                                        </li>
                                                        <li><a href="register.html">Register</a>
                                                        </li>
                                                        <li><a href="lock.html">Lock</a>
                                                        </li>
                                                        <li><a href="password-recovery.html">Password Recovery</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LeftMenu extends Component {
    render() {
        console.log(localStorage);
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
                                <h2>{localStorage.user_username}</h2>
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
                                    <li >
                                        <a className="has-arrow" href="mailbox.html" aria-expanded="false"><i className="icon nalika-mail icon-wrap" /> <span className="mini-click-non">QL Tài Khoản</span></a>
                                        <ul className="submenu-angle" aria-expanded="false">
                                            <li><Link to="/user/all-user"><span className="mini-sub-pro">Tất cả</span></Link></li>
                                            <li><Link to="/user/student"><span className="mini-sub-pro">Học sinh</span></Link></li>
                                            <li><Link to="/user/teacher"><span className="mini-sub-pro">Giảng viên</span></Link></li>
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
import React, { Component } from 'react'
import { LoginModal } from './LoginModal'

export class Header extends Component {
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
                                            <a href="index.html">
                                                <img src="img/logo.png" alt />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-lg-7">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><a className="active" href="index.html">home</a></li>
                                                    <li><a href="#">Course <i className="ti-angle-down" /></a>
                                                        <ul className="submenu">
                                                            <li><a href="#">IT</a></li>
                                                            <li><a href="#">Business</a></li>
                                                            <li><a href="#">Art</a></li>
                                                            <li><a href="#">Music</a></li>
                                                            <li><a href="#">Other</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="about.html">About</a></li>
                                                    <li><a href="contact.html">Contact</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                                        <div className="log_chat_area d-flex align-items-center">
                                            <a href="#test-form" className="login popup-with-form">
                                                <i className="flaticon-user" />
                                                <span>log in</span>
                                            </a>
                                            <div className="live_chat_btn">
                                                <a className="boxed_btn_orange" href="#">
                                                    <i className="fa fa-phone" />
                                                    <span>+10 378 467 3672</span>
                                                </a>
                                            </div>
                                        </div>
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
                <LoginModal></LoginModal>
            </div>
        )
    }
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="logo-pro">
                                    <Link to="/"><img className="main-logo" src="img/logo/logo.png" alt /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-advance-area">
                        <div className="header-top-area">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="header-top-wraper">
                                            <div className="row">
                                                <div className="col-lg-1 col-md-0 col-sm-1 col-xs-12">
                                                    <div className="menu-switcher-pro">
                                                        <button type="button" id="sidebarCollapse" className="btn bar-button-pro header-drl-controller-btn btn-info navbar-btn">
                                                            <i className="icon nalika-menu-task" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-7 col-sm-6 col-xs-12">
                                                    <div className="header-top-menu tabl-d-n hd-search-rp">
                                                        <div className="breadcome-heading">
                                                            <form role="search" className>
                                                                <input type="text" placeholder="Search..." className="form-control" />
                                                                <a href><i className="fa fa-search" /></a>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                                    <div className="header-right-info">
                                                        <ul className="nav navbar-nav mai-top-nav header-right-menu">
                                                            <li className="nav-item">
                                                                <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
                                                                    <i className="icon nalika-user" />
                                                                    <span className="admin-name">Advanda Cro</span>
                                                                    <i className="icon nalika-down-arrow nalika-angle-dw" />
                                                                </a>
                                                                <ul role="menu" className="dropdown-header-top author-log dropdown-menu animated zoomIn">
                                                                    <li><a href="register.html"><span className="icon nalika-home author-log-ic" /> Register</a>
                                                                    </li>
                                                                    <li><a href="#"><span className="icon nalika-user author-log-ic" /> My Profile</a>
                                                                    </li>
                                                                    <li><a href="lock.html"><span className="icon nalika-diamond author-log-ic" /> Lock</a>
                                                                    </li>
                                                                    <li><a href="#"><span className="icon nalika-settings author-log-ic" /> Settings</a>
                                                                    </li>
                                                                    <li><a href="login.html"><span className="icon nalika-unlocked author-log-ic" /> Log Out</a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="breadcome-area">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="breadcome-list">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                    <div className="breadcomb-wp">
                                                        <div className="breadcomb-icon">
                                                            <i className="icon nalika-home" />
                                                        </div>
                                                        <div className="breadcomb-ctn">
                                                            <h2>Dashboard One</h2>
                                                            <p>Welcome to Nalika <span className="bread-ntd">Admin Template</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
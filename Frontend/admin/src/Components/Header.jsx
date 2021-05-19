import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="logo-pro">
                                    <a href="index.html"><img className="main-logo" src="img/logo/logo.png" alt /></a>
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
                                                            <li className="nav-item dropdown">
                                                                <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><i className="icon nalika-mail" aria-hidden="true" /><span className="indicator-ms" /></a>
                                                                <div role="menu" className="author-message-top dropdown-menu animated zoomIn">
                                                                    <div className="message-single-top">
                                                                        <h1>Message</h1>
                                                                    </div>
                                                                    <ul className="message-menu">
                                                                        <li>
                                                                            <a href="#">
                                                                                <div className="message-img">
                                                                                    <img src="img/contact/1.jpg" alt />
                                                                                </div>
                                                                                <div className="message-content">
                                                                                    <span className="message-date">16 Sept</span>
                                                                                    <h2>Advanda Cro</h2>
                                                                                    <p>Please done this project as soon possible.</p>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <div className="message-img">
                                                                                    <img src="img/contact/4.jpg" alt />
                                                                                </div>
                                                                                <div className="message-content">
                                                                                    <span className="message-date">16 Sept</span>
                                                                                    <h2>Sulaiman din</h2>
                                                                                    <p>Please done this project as soon possible.</p>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <div className="message-img">
                                                                                    <img src="img/contact/3.jpg" alt />
                                                                                </div>
                                                                                <div className="message-content">
                                                                                    <span className="message-date">16 Sept</span>
                                                                                    <h2>Victor Jara</h2>
                                                                                    <p>Please done this project as soon possible.</p>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <div className="message-img">
                                                                                    <img src="img/contact/2.jpg" alt />
                                                                                </div>
                                                                                <div className="message-content">
                                                                                    <span className="message-date">16 Sept</span>
                                                                                    <h2>Victor Jara</h2>
                                                                                    <p>Please done this project as soon possible.</p>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="message-view">
                                                                        <a href="#">View All Messages</a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="nav-item"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><i className="icon nalika-alarm" aria-hidden="true" /><span className="indicator-nt" /></a>
                                                                <div role="menu" className="notification-author dropdown-menu animated zoomIn">
                                                                    <div className="notification-single-top">
                                                                        <h1>Notifications</h1>
                                                                    </div>
                                                                    <ul className="notification-menu">
                                                                        <li>
                                                                            <a href="#">
                                                                                <div className="notification-icon">
                                                                                    <i className="icon nalika-tick" aria-hidden="true" />
                                                                                </div>
                                                                                <div className="notification-content">
                                                                                    <span className="notification-date">16 Sept</span>
                                                                                    <h2>Advanda Cro</h2>
                                                                                    <p>Please done this project as soon possible.</p>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <div className="notification-icon">
                                                                                    <i className="icon nalika-cloud" aria-hidden="true" />
                                                                                </div>
                                                                                <div className="notification-content">
                                                                                    <span className="notification-date">16 Sept</span>
                                                                                    <h2>Sulaiman din</h2>
                                                                                    <p>Please done this project as soon possible.</p>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <div className="notification-icon">
                                                                                    <i className="icon nalika-folder" aria-hidden="true" />
                                                                                </div>
                                                                                <div className="notification-content">
                                                                                    <span className="notification-date">16 Sept</span>
                                                                                    <h2>Victor Jara</h2>
                                                                                    <p>Please done this project as soon possible.</p>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <div className="notification-icon">
                                                                                    <i className="icon nalika-bar-chart" aria-hidden="true" />
                                                                                </div>
                                                                                <div className="notification-content">
                                                                                    <span className="notification-date">16 Sept</span>
                                                                                    <h2>Victor Jara</h2>
                                                                                    <p>Please done this project as soon possible.</p>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="notification-view">
                                                                        <a href="#">View All Notification</a>
                                                                    </div>
                                                                </div>
                                                            </li>
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
                                                            <li className="nav-item nav-setting-open"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><i className="icon nalika-menu-task" /></a>
                                                                <div role="menu" className="admintab-wrap menu-setting-wrap menu-setting-wrap-bg dropdown-menu animated zoomIn">
                                                                    <ul className="nav nav-tabs custon-set-tab">
                                                                        <li className="active"><a data-toggle="tab" href="#Notes">News</a>
                                                                        </li>
                                                                        <li><a data-toggle="tab" href="#Projects">Activity</a>
                                                                        </li>
                                                                        <li><a data-toggle="tab" href="#Settings">Settings</a>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="tab-content custom-bdr-nt">
                                                                        <div id="Notes" className="tab-pane fade in active">
                                                                            <div className="notes-area-wrap">
                                                                                <div className="note-heading-indicate">
                                                                                    <h2><i className="icon nalika-chat" /> Latest News</h2>
                                                                                    <p>You have 10 New News.</p>
                                                                                </div>
                                                                                <div className="notes-list-area notes-menu-scrollbar">
                                                                                    <ul className="notes-menu-list">
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/4.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/1.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/2.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/3.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/4.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/1.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/2.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/1.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/2.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="notes-list-flow">
                                                                                                    <div className="notes-img">
                                                                                                        <img src="img/contact/3.jpg" alt />
                                                                                                    </div>
                                                                                                    <div className="notes-content">
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                                                                                        <span>Yesterday 2:45 pm</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div id="Projects" className="tab-pane fade">
                                                                            <div className="projects-settings-wrap">
                                                                                <div className="note-heading-indicate">
                                                                                    <h2><i className="icon nalika-happiness" /> Recent Activity</h2>
                                                                                    <p> You have 20 Recent Activity.</p>
                                                                                </div>
                                                                                <div className="project-st-list-area project-st-menu-scrollbar">
                                                                                    <ul className="projects-st-menu-list">
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="project-list-flow">
                                                                                                    <div className="projects-st-heading">
                                                                                                        <h2>New User Registered</h2>
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                                                                                        <span className="project-st-time">1 hours ago</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="project-list-flow">
                                                                                                    <div className="projects-st-heading">
                                                                                                        <h2>New Order Received</h2>
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                                                                                        <span className="project-st-time">2 hours ago</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="project-list-flow">
                                                                                                    <div className="projects-st-heading">
                                                                                                        <h2>New Order Received</h2>
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                                                                                        <span className="project-st-time">3 hours ago</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="project-list-flow">
                                                                                                    <div className="projects-st-heading">
                                                                                                        <h2>New Order Received</h2>
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                                                                                        <span className="project-st-time">4 hours ago</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="project-list-flow">
                                                                                                    <div className="projects-st-heading">
                                                                                                        <h2>New User Registered</h2>
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                                                                                        <span className="project-st-time">5 hours ago</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="project-list-flow">
                                                                                                    <div className="projects-st-heading">
                                                                                                        <h2>New Order</h2>
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                                                                                        <span className="project-st-time">6 hours ago</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="project-list-flow">
                                                                                                    <div className="projects-st-heading">
                                                                                                        <h2>New User</h2>
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                                                                                        <span className="project-st-time">7 hours ago</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#">
                                                                                                <div className="project-list-flow">
                                                                                                    <div className="projects-st-heading">
                                                                                                        <h2>New Order</h2>
                                                                                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                                                                                        <span className="project-st-time">9 hours ago</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div id="Settings" className="tab-pane fade">
                                                                            <div className="setting-panel-area">
                                                                                <div className="note-heading-indicate">
                                                                                    <h2><i className="icon nalika-gear" /> Settings Panel</h2>
                                                                                    <p> You have 20 Settings. 5 not completed.</p>
                                                                                </div>
                                                                                <ul className="setting-panel-list">
                                                                                    <li>
                                                                                        <div className="checkbox-setting-pro">
                                                                                            <div className="checkbox-title-pro">
                                                                                                <h2>Show notifications</h2>
                                                                                                <div className="ts-custom-check">
                                                                                                    <div className="onoffswitch">
                                                                                                        <input type="checkbox" name="collapsemenu" className="onoffswitch-checkbox" id="example" />
                                                                                                        <label className="onoffswitch-label" htmlFor="example">
                                                                                                            <span className="onoffswitch-inner" />
                                                                                                            <span className="onoffswitch-switch" />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="checkbox-setting-pro">
                                                                                            <div className="checkbox-title-pro">
                                                                                                <h2>Disable Chat</h2>
                                                                                                <div className="ts-custom-check">
                                                                                                    <div className="onoffswitch">
                                                                                                        <input type="checkbox" name="collapsemenu" className="onoffswitch-checkbox" id="example3" />
                                                                                                        <label className="onoffswitch-label" htmlFor="example3">
                                                                                                            <span className="onoffswitch-inner" />
                                                                                                            <span className="onoffswitch-switch" />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="checkbox-setting-pro">
                                                                                            <div className="checkbox-title-pro">
                                                                                                <h2>Enable history</h2>
                                                                                                <div className="ts-custom-check">
                                                                                                    <div className="onoffswitch">
                                                                                                        <input type="checkbox" name="collapsemenu" className="onoffswitch-checkbox" id="example4" />
                                                                                                        <label className="onoffswitch-label" htmlFor="example4">
                                                                                                            <span className="onoffswitch-inner" />
                                                                                                            <span className="onoffswitch-switch" />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="checkbox-setting-pro">
                                                                                            <div className="checkbox-title-pro">
                                                                                                <h2>Show charts</h2>
                                                                                                <div className="ts-custom-check">
                                                                                                    <div className="onoffswitch">
                                                                                                        <input type="checkbox" name="collapsemenu" className="onoffswitch-checkbox" id="example7" />
                                                                                                        <label className="onoffswitch-label" htmlFor="example7">
                                                                                                            <span className="onoffswitch-inner" />
                                                                                                            <span className="onoffswitch-switch" />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="checkbox-setting-pro">
                                                                                            <div className="checkbox-title-pro">
                                                                                                <h2>Update everyday</h2>
                                                                                                <div className="ts-custom-check">
                                                                                                    <div className="onoffswitch">
                                                                                                        <input type="checkbox" name="collapsemenu" defaultChecked className="onoffswitch-checkbox" id="example2" />
                                                                                                        <label className="onoffswitch-label" htmlFor="example2">
                                                                                                            <span className="onoffswitch-inner" />
                                                                                                            <span className="onoffswitch-switch" />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="checkbox-setting-pro">
                                                                                            <div className="checkbox-title-pro">
                                                                                                <h2>Global search</h2>
                                                                                                <div className="ts-custom-check">
                                                                                                    <div className="onoffswitch">
                                                                                                        <input type="checkbox" name="collapsemenu" defaultChecked className="onoffswitch-checkbox" id="example6" />
                                                                                                        <label className="onoffswitch-label" htmlFor="example6">
                                                                                                            <span className="onoffswitch-inner" />
                                                                                                            <span className="onoffswitch-switch" />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="checkbox-setting-pro">
                                                                                            <div className="checkbox-title-pro">
                                                                                                <h2>Offline users</h2>
                                                                                                <div className="ts-custom-check">
                                                                                                    <div className="onoffswitch">
                                                                                                        <input type="checkbox" name="collapsemenu" defaultChecked className="onoffswitch-checkbox" id="example5" />
                                                                                                        <label className="onoffswitch-label" htmlFor="example5">
                                                                                                            <span className="onoffswitch-inner" />
                                                                                                            <span className="onoffswitch-switch" />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                        {/* Mobile Menu start */}
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
                        {/* Mobile Menu end */}
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
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                    <div className="breadcomb-report">
                                                        <button data-toggle="tooltip" data-placement="left" title="Download Report" className="btn"><i className="icon nalika-download" /></button>
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
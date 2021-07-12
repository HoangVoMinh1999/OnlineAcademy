import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" />
                    <div className="col-md-4 col-md-4 col-sm-4 col-xs-12">
                        <div className="text-center m-b-md custom-login">
                            <h3>PLEASE LOGIN TO APP</h3>
                            <p>This is the best app ever!</p>
                        </div>
                        <div className="hpanel">
                            <div className="panel-body">
                                <form action="#" id="loginForm">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="username">Username</label>
                                        <input type="text" title="Please enter you username" required defaultValue name="username" id="username" className="form-control" />
                                        <span className="help-block small">Your unique username to app</span>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="password">Password</label>
                                        <input type="password" title="Please enter your password" required defaultValue name="password" id="password" className="form-control" />
                                        <span className="help-block small">Yur strong password</span>
                                    </div>
                                    <div className="checkbox login-checkbox">
                                        <label>
                                            <input type="checkbox" className="i-checks" /> Remember me </label>
                                        <p className="help-block small">(if this is a private computer)</p>
                                    </div>
                                    <button className="btn btn-success btn-block loginbtn">Login</button>
                                    <a className="btn btn-default btn-block" href="#">Register</a>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" />
                </div>
                <div className="row">
                    <div className="col-md-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <p>Copyright © 2018 <a href="https://colorlib.com/wp/templates/">Colorlib</a> All rights reserved.</p>
                    </div>
                </div>
            </div>

        )
    }
}

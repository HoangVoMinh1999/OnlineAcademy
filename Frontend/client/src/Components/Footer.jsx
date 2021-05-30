import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div>
                {/* footer */}
                <footer className="footer footer_bg_1">
                    <div className="footer_top">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-md-6 col-lg-4">
                                    <div className="footer_widget">
                                        <div className="footer_logo">
                                            <a href="#">
                                                <img src="img/logo.png" alt />
                                            </a>
                                        </div>
                                        <p>
                                            Firmament morning sixth subdue darkness creeping gathered divide our let god moving.
                                            Moving in fourth air night bring upon it beast let you dominion likeness open place day
                                            great.
                                        </p>
                                        <div className="socail_links">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <i className="ti-facebook" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ti-twitter-alt" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-instagram" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-youtube-play" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 offset-xl-1 col-md-6 col-lg-3">
                                    <div className="footer_widget">
                                        <h3 className="footer_title">
                                            Courses
                                        </h3>
                                        <ul>
                                            <li><a href="#">Wordpress</a></li>
                                            <li><a href="#"> Photoshop</a></li>
                                            <li><a href="#">Illustrator</a></li>
                                            <li><a href="#">Adobe XD</a></li>
                                            <li><a href="#">UI/UX</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-md-6 col-lg-2">
                                    <div className="footer_widget">
                                        <h3 className="footer_title">
                                            Resourches
                                        </h3>
                                        <ul>
                                            <li><a href="#">Free Adobe XD</a></li>
                                            <li><a href="#">Tutorials</a></li>
                                            <li><a href="#">About</a></li>
                                            <li><a href="#"> About</a></li>
                                            <li><a href="#"> Contact</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 col-lg-3">
                                    <div className="footer_widget">
                                        <h3 className="footer_title">
                                            Address
                                        </h3>
                                        <p>
                                            200, D-block, Green lane USA <br />
                                            +10 367 467 8934 <br />
                                            edumark@contact.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copy-right_text">
                        <div className="container">
                            <div className="footer_border" />
                            <div className="row">
                                <div className="col-xl-12">
                                    <p className="copy_right text-center">
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* footer */}

            </div>
        )
    }
}
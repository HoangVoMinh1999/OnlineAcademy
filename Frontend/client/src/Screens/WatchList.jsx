import React, { Component } from 'react'

export default class WatchList extends Component {
    renderTab = () => {
        return <li className="nav-item">
            <a className={`nav-link  active`} data-toggle="tab" href="#" role="tab" aria-controls="watchlist" aria-selected="false" ></a>
        </li>
    }

    renderTabContent = () => {
        
    }
    render() {
        return (
            <div>
                <div className="slider_area ">
                    <div className="single_slider d-flex align-items-center justify-content-center slider_bg_1" style={{ height: '20rem' }}>
                        <div className="container">
                            <div className="section_title text-center" style={{ marginTop: '5rem' }}>
                                <h3 style={{ color: 'white' }}>Danh sách khóa học yêu thích</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* popular_courses_start */}
                <div className="popular_courses">
                    <div className="container">
                        <div className="row">
                        </div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="course_nav">
                                    <nav>
                                        <ul className="nav" id="myTab" role="tablist">
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="all_courses">
                        <div className="container d-flex flex-column">
                            <div className="tab-content" id="myTabContent" >
                            </div>
                        </div>
                    </div>
                </div>
                {/* popular_courses_end*/}
            </div>
        )
    }
}
import React, { Component } from 'react'

export default class CourseList extends Component {
    render() {
        return (
            <div>
                <div className="product-status mg-b-30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap">
                                    <h4>Products List</h4>
                                    <div className="add-product">
                                        <a href="category-add.html">Thêm khóa học</a>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên khóa học</th>
                                                <th>Loại khóa học</th>
                                                <th>Đánh giá</th>
                                                <th>Giá</th>
                                                <th>Giảm giá</th>
                                                <th>Học sinh</th>
                                                <th>Hoàn thành</th>
                                                <th>More</th>
                                            </tr>
                                        </thead>
                                        <tbody id="categoryContent">
                                            
                                        </tbody>
                                    </table>
                                    <div className="custom-pagination">
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                        </ul>
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


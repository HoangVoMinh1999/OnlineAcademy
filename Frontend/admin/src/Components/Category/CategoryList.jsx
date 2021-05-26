import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import Action from "../../Redux/Action/action"

class CategoryList extends Component {
    constructor(props) {
        super(props);
    }

    renderContent = () => {
        console.log(this.props.mainCategoryList)
        return (
            this.props.categoryList.map((category, index) => {
                return <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.category_id}</td>
                    <td>
                        <button class="pd-setting">Active</button>
                    </td>
                    <td>
                        <button id="categoryEdit" title="Edit" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                        <button id="categoryRemove" title="Trash" class="pd-setting-ed"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </td>
                </tr>
            })
        )
    }

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
                                    <a href="category-add.html">Thêm loại khóa học</a>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên</th>
                                            <th>Category Cha</th>
                                            <th>Status</th>
                                            <th>Tùy chỉnh</th>
                                        </tr>
                                    </thead>
                                    <tbody id="categoryContent">
                                        {this.renderContent()}
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

componentDidMount() {
    Axios({
        method: 'GET',
        url: 'http://localhost:4000/api/category'
    }).then(res => {
        this.props.updateCategoryList(res.data);
    }).catch(err => {
        console.log(err);
    })
}
}

const mapStateToProps = (state) => {
    return { categoryList: state.CategoryReducer.CategoryList,
            mainCategoryList : state.CategoryReducer.MainCategoryList }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCategoryList: (categoryList) => {
            dispatch({
                type: 'UPDATE_LIST',
                categoryList,
            });
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
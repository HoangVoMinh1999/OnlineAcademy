import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { appendScript } from '../../utils/appendScript'

class CategoryAdd extends Component {

    state = {
        values: {
            name: '',
            category_id: null
        },
        errors: {
            name: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            values: { ...this.state.values, [name]: value }
        })
    }

    validateData = (name, value) => {
        let errMessage = '';
        if (name = 'name') {
            if (!value) {
                errMessage = 'Tên loại sản phẩm không được để trống'
            }
        }
        return errMessage;
    }

    handleBlur = (e) => {
        const { name, value } = e.target;
        const errMessage = this.validateData(name, value);
        this.setState({ errors: { ...this.state.errors, [name]: errMessage } })
    }

    renderError = (errMessage) => {
        if (errMessage !== '') {
            return <div className="alert alert-danger">{errMessage}</div>
        }
        return '';
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const body = this.state.values;

        Axios.post('http://localhost:4000/api/category', body).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })


    }

    renderMainCategory = () => {
        return this.props.mainCategoryList.map((item, index) => {
            return <option value={item.id}>{item.name}</option>
        })
    }

    render() {
        return (
            <div>
                {/* Single pro tab start*/}
                <div className="single-product-tab-area mg-b-30">
                    {/* Single pro tab review Start*/}
                    <div className="single-pro-review-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="review-tab-pro-inner">
                                        <ul id="myTab3" className="tab-review-design">
                                            <li className="active"><a href="#description"><i className="icon nalika-edit" aria-hidden="true" /> Product Info</a></li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content custom-product-edit">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="product-tab-list tab-pane fade active in" id="description">
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-user" aria-hidden="true" /></span>
                                                                    <input id="categoryName" type="text" name="name" value={this.state.values.name} className="form-control" placeholder="Name" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.name)}
                                                                <select name="category_id" class="form-control pro-edt-select form-control-primary" value={this.state.values.category_id} onChange={this.handleChange}>
                                                                    <option value={null}>Select One Value Only</option>
                                                                    {this.renderMainCategory()}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="text-center custom-pro-edt-ds">
                                                                <button type="submit" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Save</button>
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light">Discard</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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
    componentDidMount() {



        appendScript("js/vendor/jquery-1.12.4.min.js");

        appendScript("js/bootstrap.min.js");

        appendScript("js/wow.min.js");

        appendScript("js/jquery-price-slider.js");

        appendScript("js/jquery.meanmenu.js");

        appendScript("js/owl.carousel.min.js");

        appendScript("js/jquery.sticky.js");

        appendScript("js/jquery.scrollUp.min.js");

        appendScript("js/scrollbar/jquery.mCustomScrollbar.concat.min.js");
        appendScript("js/scrollbar/mCustomScrollbar-active.js");

        appendScript("js/metisMenu/metisMenu.min.js");
        appendScript("js/metisMenu/metisMenu-active.js");

        appendScript("js/sparkline/jquery.sparkline.min.js");
        appendScript("js/sparkline/jquery.charts-sparkline.js");
        appendScript("js/calendar/moment.min.js");
        appendScript("js/calendar/fullcalendar.min.js");
        appendScript("js/calendar/fullcalendar-active.js");
        appendScript("js/flot/jquery.flot.js");
        appendScript("js/flot/jquery.flot.resize.js");
        appendScript("js/flot/curvedLines.js");
        appendScript("js/flot/flot-active.js");
        appendScript("js/plugins.js");

        appendScript("js/main.js");
    }
}

const mapStateToProps = (state) => {
    return { mainCategoryList: state.CategoryReducer.MainCategoryList }
}

// const mapDispacthtoProps = (dispatch) => {
//     return {
//         addCategory: (newCategory) => {
//             dispatch({
//                 type: Action.ADD_NEW_ITEM,
//                 payload: newCategory,
//             });
//         },
//         updateCategory: (category) => {
//             dispatch({
//                 type: Action.UPDATE_ITEM,
//                 payload: category,
//             })
//         },
//     }
// }


export default connect(mapStateToProps)(CategoryAdd)
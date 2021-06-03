import React, { Component } from 'react';
import { categoryService, courseService } from '../../Services';
import swal from 'sweetalert'
import { connect } from 'react-redux';
import { GET_LIST } from '../../Redux/Action/type';
import createAction from '../../Redux/Action';
import wysiwyg from '../wysiwyg'

class CourseAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                name: '',
                category_id: null,
                rate: 0,
                price: 0,
                sale: 0,
                max_students: 0,
                current_student: 0,
                short_description: '',
                full_description: '',
            },
            errors: {
                name: '',
                category_id: '',
                rate: '',
                price: '',
                sale: '',
                max_students: '',
                short_description: '',
                full_description: '',
            },
            activeTab: 'description',
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ values: { ...this.state.values, [name]: value } })
    }

    validateData = (name, value) => {
        let errMessage = '';
        if (name === 'name') {
            if (!value) {
                errMessage = 'Tên khóa học không được để trống'
            }
        }
        if (name === 'price') {
            if (!value) {
                errMessage = 'Giá khóa học không được để trống'
            }
        }
        if (name === 'max_students') {
            if (!value) {
                errMessage = 'Tên loại sản phẩm không được để trống'
            }
        }
        if (name === 'short_description') {
            if (!value) {
                errMessage = 'Tên loại sản phẩm không được để trống'
            }
        }
        return errMessage;
    };

    handleBlur = (e) => {
        console.log('Blur')
        const { name, value } = e.target;
        const errMessage = this.validateData(name, value);
        this.setState({ errors: { ...this.state.errors, [name]: errMessage } })
    };

    renderError = (errMessage) => {
        if (errMessage != '') {
            console.log(errMessage)
            return <div className="alert alert-danger">{errMessage}</div>
        }
        return ''
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const body = this.state.values;
        const res = await courseService.addNewCourse(body)
        this.setState({
            values: {
                name: '',
                category_id: null,
                rate: 0,
                price: 0,
                sale: 0,
                max_students: 0,
                current_student: 0,
                short_description: '',
                full_description: '',
            },
            errors: {
                name: '',
                category_id: '',
                rate: '',
                price: '',
                sale: '',
                max_students: '',
                short_description: '',
                full_description: '',
            }
        })
        if (!res.data.err_message) {
            swal({
                title: "Chúc mừng",
                text: "Thêm loại khóa học thành công !!!",
                icon: "success",
            });
        }
        else {
            if (res.data.err_message === 'This category is existed') {
                swal({
                    title: "Cảnh báo",
                    text: "Loại khóa học đã tồn tại",
                    icon: "error",
                });
            }
            else {
                swal({
                    title: "Cảnh báo",
                    text: "Chưa có nội dung cho loại khóa học",
                    icon: "error",
                });
            }
        }
    }

    renderCategoryList = () => {
        return this.props.categoryList.map((category) => {
            return <option value={category.id}>{category.name}</option>
        })
    }

    handleClickTab = (event) => {
        let { id } = event.target;
        this.setState({
            activeTab: id
        })
    }

    render() {
        return (
            <div>
                <div className="single-product-tab-area mg-b-30">
                    {/* Single pro tab review Start*/}
                    <div className="single-pro-review-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="review-tab-pro-inner">
                                        <ul id="myTab3" className="tab-review-design">
                                            <li className={this.state.activeTab === "description" ? "active" : ""}><a id="description" href="#description" onClick={this.handleClickTab}><i className="icon nalika-edit" aria-hidden="true" /> Product Edit</a></li>
                                            <li className={this.state.activeTab === "reviews" ? "active" : ""}><a id="reviews" href="#reviews" onClick={this.handleClickTab}><i className="icon nalika-picture" aria-hidden="true" /> Pictures</a></li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content custom-product-edit">
                                            <div className={`product-tab-list tab-pane fade ${this.state.activeTab === "description" ? "active in" : ""}`} id="description" >
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-edit" aria-hidden="true" /></span>
                                                                    <input type="text" className="form-control" name="name" value={this.state.values.name} placeholder="Tên khóa học" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.name)}
                                                                <select name="category_id" className="form-control pro-edt-select form-control-primary" value={this.state.values.category_id} placeholder="Loại khóa học" onChange={this.handleChange} onBlur={this.handleBlur}>
                                                                    <option value="">Loại khóa học</option>
                                                                    {this.renderCategoryList()}
                                                                </select>
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true" /></span>
                                                                    <input type="text" name="price" value={this.state.values.price === 0 ? "" : this.state.values.price} className="form-control" placeholder="Giá khóa học" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.price)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-favorites" aria-hidden="true" /></span>
                                                                    <input type="text" name="max_students" value={this.state.values.max_students === 0 ? "" : this.state.values.max_students} className="form-control" placeholder="Số lượng học sinh/sinh viên" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.max_students)}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-favorites-button" aria-hidden="true" /></span>
                                                                    <textarea className="form-control" name="short_description" value={this.state.values.short_description} cols="30" rows="10" placeholder="Mô tả ngắn gọn" onChange={this.handleChange} onBlur={this.handleBlur}></textarea>
                                                                </div>
                                                                {this.renderError(this.state.errors.short_description)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="text-center custom-pro-edt-ds">
                                                                <h3 className="text-white">Mô tả chi tiết</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="text-center custom-pro-edt-ds">
                                                                <button type="submit" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Save</button>
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light" onClick={() => this.props.history.goBack()}>Discard</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className={`product-tab-list tab-pane fade ${this.state.activeTab === "reviews" ? "active in" : ""}`} id="reviews">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="review-content-section">
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <div className="pro-edt-img mg-b-0">
                                                                        <img src="img/new-product/7-small.jpg" alt />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="product-edt-pix-wrap">
                                                                                <div className="input-group">
                                                                                    <span className="input-group-addon">TT</span>
                                                                                    <input type="text" className="form-control" placeholder="Label Name" />
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-lg-6">
                                                                                        <div className="form-radio">
                                                                                            <form>
                                                                                                <div className="radio radiofill">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="helper" />Largest Image
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="radio radiofill">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="helper" />Medium Image
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="radio radiofill">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="helper" />Small Image
                                                                                                    </label>
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-lg-6">
                                                                                        <div className="product-edt-remove">
                                                                                            <button type="button" className="btn btn-ctl-bt waves-effect waves-light">Remove
                                                                                                <i className="fa fa-times" aria-hidden="true" />
                                                                                            </button>
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
    async componentDidMount() {
        if (this.props.categoryList.length === 0) {
            const res = await categoryService.getAllCategories();
            console.log(res.data)
            this.props.dispatch(
                createAction(
                    GET_LIST,
                    res.data
                )
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.ChildCategory
    }
}

export default connect(mapStateToProps)(CourseAdd);
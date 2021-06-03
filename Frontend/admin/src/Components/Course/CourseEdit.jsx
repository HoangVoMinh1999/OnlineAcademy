import React, { Component } from 'react';
import { categoryService, courseService } from '../../Services';
import swal from 'sweetalert'
import { connect } from 'react-redux';
import { GET_LIST } from '../../Redux/Action/type';
import createAction from '../../Redux/Action';

class CourseEdit extends Component {

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
                IsFinish: false,
                sale_info: '',
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
            activeTab : 'description'
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name+ " " +e.target.checked)
        if (name === "IsFinish"){
            this.setState({
                IsFinish : e.target.checked
            })
        }
        else{
            this.setState({ values: { ...this.state.values, [name]: value } })
        }

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
        const id = this.props.match.params.id;
        const res = await courseService.updateCourse(id, body)
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
                IsFinish: false,
                sale_info : '',
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
        })
        if (!res.data.err_message) {
            swal({
                title: "Chúc mừng",
                text: "Cập nhật khóa học thành công !!!",
                icon: "success",
            });
        }
        else {
            if (res.data.err_message === 'This course is existed') {
                swal({
                    title: "Cảnh báo",
                    text: "Khóa học đã tồn tại",
                    icon: "error",
                });
            }
            else {
                swal({
                    title: "Cảnh báo",
                    text: "Chưa có nội dung cho khóa học",
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
        const {name, IsFinish}=this.state.values;
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
                                            <li className={this.state.activeTab === "description" ? "active" : ""}><a id="description" href="#description" onClick={this.handleClickTab}><i className="icon nalika-edit" aria-hidden="true" /> Thông tin khóa học</a></li>
                                            <li className={this.state.activeTab === "reviews" ? "active" : ""}><a id="reviews" href="#reviews" onClick={this.handleClickTab}><i className="icon nalika-picture" aria-hidden="true" /> Pictures</a></li>
                                            <li className={this.state.activeTab === "INFORMATION" ? "active" : ""}><a id="INFORMATION" href="#INFORMATION" onClick={this.handleClickTab}><i className="icon nalika-chat" aria-hidden="true" /> Bài học</a></li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content custom-product-edit">
                                            <div className={`product-tab-list tab-pane fade ${this.state.activeTab === "description" ? "active in" : ""}`} id="description">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Tên khóa học</span>
                                                                    <input type="text" className="form-control" name="name" value={this.state.values.name} placeholder="Tên khóa học" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.name)}
                                                                <select name="category_id" className="form-control pro-edt-select form-control-primary" value={this.state.values.category_id} placeholder="Loại khóa học" onChange={this.handleChange} onBlur={this.handleBlur}>
                                                                    <option value>Loại khóa học</option>
                                                                    {this.renderCategoryList()}
                                                                </select>
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Giá khóa học</span>
                                                                    <input type="text" name="price" value={this.state.values.price} className="form-control" placeholder="Giá khóa học" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.price)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Số lượng hs/sv</span>
                                                                    <input type="text" name="max_students" value={this.state.values.max_students} className="form-control" placeholder="Số lượng học sinh/sinh viên" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.max_students)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Giảm giá(%)</span>
                                                                    <input type="text" name="sale" value={this.state.values.sale} className="form-control" placeholder="Giảm giá(%)" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.rate)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Kết thúc khóa học</span>
                                                                    <input type="checkbox" name="IsFinish" checked={this.state.values.IsFinish} className="form-control" onClick={this.handleChange} onBlur={this.handleBlur}/>
                                                                </div>
                                                                {this.renderError(this.state.errors.rate)}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Mô tả chung</span>
                                                                    <textarea className="form-control" name="short_description" value={this.state.values.short_description} cols="30" rows="10" placeholder="Mô tả ngắn gọn" onChange={this.handleChange} onBlur={this.handleBlur}></textarea>
                                                                    {this.renderError(this.state.errors.short_description)}
                                                                </div>
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <p className="input-group-addon">Thông tin giảm giá</p>
                                                                    <textarea className="form-control" name="sale_info" value={this.state.values.sale_info} cols="30" rows="4" placeholder="Mô tả ngắn gọn" onChange={this.handleChange} onBlur={this.handleBlur}></textarea>
                                                                </div>
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
                                                                    <div className="pro-edt-img">
                                                                        <img src="img/new-product/5-small.jpg" alt />
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
                                            <div className={`product-tab-list tab-pane fade ${this.state.activeTab === "INFORMATION" ? "active in" : ""}`} id="INFORMATION" >
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="review-content-section">
                                                            <form>
                                                                <div className="card-block">
                                                                    <div className="input-group mg-b-15 mg-t-15">
                                                                        <span className="input-group-addon"><i className="icon nalika-user" aria-hidden="true" /></span>
                                                                        <input type="text" className="form-control" placeholder="Tên bài học" />
                                                                    </div>
                                                                    <div className="input-group mg-b-15">
                                                                        <span className="input-group-addon"><i className="icon nalika-user" aria-hidden="true" /></span>
                                                                        <textarea className="form-control" name="" id="" cols="30" rows="10" placeholder="Nội dung tóm tắt"></textarea>
                                                                    </div>
                                                                    <div className="input-group mg-b-15">
                                                                        <span className="input-group-addon"><i className="icon nalika-mail" aria-hidden="true" /></span>
                                                                        <input type="text" className="form-control" placeholder="Link video bài giảng" />
                                                                    </div>
                                                                    <div className="input-group mg-b-15">
                                                                        <span className="input-group-addon">Cho phép xem review</span>
                                                                        <input type="checkbox" />
                                                                    </div>
                                                                    <div className="form-group review-pro-edt mg-b-0-pt">
                                                                        <button type="submit" className="btn btn-ctl-bt waves-effect waves-light">Submit
                                                                    </button>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const detail = await courseService.getCourseDetail(id);
        console.log(detail)
        const newCourse = {
            name: detail.data.name,
            category_id: detail.data.category_id,
            rate: detail.data.rate,
            price: detail.data.price,
            sale: detail.data.sale,
            max_students: detail.data.max_students,
            current_student: detail.data.current_student,
            short_description: detail.data.short_description,
            full_description: detail.data.full_description,
            sale_info : detail.data.sale_info,
            IsFinish : detail.data.IsFinish,
        }
        this.setState({
            ...this.state,
            values: newCourse
        })
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.ChildCategory
    }
}

export default connect(mapStateToProps)(CourseEdit);
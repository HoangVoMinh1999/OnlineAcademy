import React, { Component } from 'react';

export default class CourseInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                name: '',
                category_id: '',
                rate: '',
                price: '',
                sale: '',
                max_students: '',
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
        if (name === 'price'){
            if (!value) {
                errMessage = 'Giá khóa học không được để trống'
            }
        }
        if (name === 'max_students'){
            if (!value) {
                errMessage = 'Tên loại sản phẩm không được để trống'
            }
        }
        if (name === 'short_description'){
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
                                            <li className="active"><a href="#description"><i className="icon nalika-edit" aria-hidden="true" /> Product Edit</a></li>
                                            <li><a href="#reviews"><i className="icon nalika-picture" aria-hidden="true" /> Pictures</a></li>
                                            <li><a href="#INFORMATION"><i className="icon nalika-chat" aria-hidden="true" /> Review</a></li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content custom-product-edit">
                                            <div className="product-tab-list tab-pane fade active in" id="description">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-edit" aria-hidden="true" /></span>
                                                                    <input type="text" className="form-control" name="name" value={this.state.values.name} placeholder="Tên khóa học" onChange={this.handleChange} onBlur={this.handleBlur}/>
                                                                </div>
                                                                {this.renderError(this.state.errors.name)}
                                                                <select name="category_id" className="form-control pro-edt-select form-control-primary" placeholder="Loại khóa học">
                                                                    <option value="">Loại khóa học</option>
                                                                    <option value="opt2">2</option>
                                                                    <option value="opt3">3</option>
                                                                    <option value="opt4">4</option>
                                                                    <option value="opt5">5</option>
                                                                    <option value="opt6">6</option>
                                                                </select>
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true" /></span>
                                                                    <input type="text" name="price" value={this.state.values.price} className="form-control" placeholder="Giá khóa học" onChange={this.handleChange} onBlur={this.handleBlur}/>
                                                                </div>
                                                                {this.renderError(this.state.errors.price)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-favorites" aria-hidden="true" /></span>
                                                                    <input type="text" name="max_students" value={this.state.values.max_students} className="form-control" placeholder="Số lượng học sinh/sinh viên" onChange={this.handleChange} onBlur={this.handleBlur}/>
                                                                </div>
                                                                {this.renderError(this.state.errors.max_students)}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-favorites-button" aria-hidden="true" /></span>
                                                                    <textarea className="form-control" name="short-description" value={this.state.values.short_description} cols="30" rows="10" placeholder="Mô tả ngắn gọn" onChange={this.handleChange} onBlur={this.handleBlur}></textarea>
                                                                    {this.renderError(this.state.errors.short_description)}
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
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Save</button>
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light">Discard</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="product-tab-list tab-pane fade" id="reviews">
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
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <div className="pro-edt-img">
                                                                        <img src="img/new-product/6-small.jpg" alt />
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
                                            <div className="product-tab-list tab-pane fade" id="INFORMATION">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="review-content-section">
                                                            <div className="card-block">
                                                                <div className="text-muted f-w-400">
                                                                    <p>No reviews yet.</p>
                                                                </div>
                                                                <div className="m-t-10">
                                                                    <div className="txt-primary f-18 f-w-600">
                                                                        <p>Your Rating</p>
                                                                    </div>
                                                                    <div className="stars stars-example-css detail-stars">
                                                                        <div className="review-rating">
                                                                            <fieldset className="rating">
                                                                                <input type="radio" id="star5" name="rating" defaultValue={5} />
                                                                                <label className="full" htmlFor="star5" />
                                                                                <input type="radio" id="star4half" name="rating" defaultValue="4 and a half" />
                                                                                <label className="half" htmlFor="star4half" />
                                                                                <input type="radio" id="star4" name="rating" defaultValue={4} />
                                                                                <label className="full" htmlFor="star4" />
                                                                                <input type="radio" id="star3half" name="rating" defaultValue="3 and a half" />
                                                                                <label className="half" htmlFor="star3half" />
                                                                                <input type="radio" id="star3" name="rating" defaultValue={3} />
                                                                                <label className="full" htmlFor="star3" />
                                                                                <input type="radio" id="star2half" name="rating" defaultValue="2 and a half" />
                                                                                <label className="half" htmlFor="star2half" />
                                                                                <input type="radio" id="star2" name="rating" defaultValue={2} />
                                                                                <label className="full" htmlFor="star2" />
                                                                                <input type="radio" id="star1half" name="rating" defaultValue="1 and a half" />
                                                                                <label className="half" htmlFor="star1half" />
                                                                                <input type="radio" id="star1" name="rating" defaultValue={1} />
                                                                                <label className="full" htmlFor="star1" />
                                                                                <input type="radio" id="starhalf" name="rating" defaultValue="half" />
                                                                                <label className="half" htmlFor="starhalf" />
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="clear" />
                                                                    </div>
                                                                </div>
                                                                <div className="input-group mg-b-15 mg-t-15">
                                                                    <span className="input-group-addon"><i className="icon nalika-user" aria-hidden="true" /></span>
                                                                    <input type="text" className="form-control" placeholder="User Name" />
                                                                </div>
                                                                <div className="input-group mg-b-15">
                                                                    <span className="input-group-addon"><i className="icon nalika-user" aria-hidden="true" /></span>
                                                                    <input type="text" className="form-control" placeholder="Last Name" />
                                                                </div>
                                                                <div className="input-group mg-b-15">
                                                                    <span className="input-group-addon"><i className="icon nalika-mail" aria-hidden="true" /></span>
                                                                    <input type="text" className="form-control" placeholder="Email" />
                                                                </div>
                                                                <div className="form-group review-pro-edt mg-b-0-pt">
                                                                    <button type="submit" className="btn btn-ctl-bt waves-effect waves-light">Submit
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
        )
    }
}
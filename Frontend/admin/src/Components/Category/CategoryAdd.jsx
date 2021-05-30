import React, { Component } from 'react'
import { connect } from 'react-redux'
import { appendScript } from '../../utils/appendScript'
import { categoryService } from '../../Services'
import swal from 'sweetalert';

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

    handleSubmit = async (event) => {
        event.preventDefault();
        const body = this.state.values;
        const res = await categoryService.addNewCategory(body);
        console.log(res.data);
        this.setState({
            values: {
                name: '',
                category_id: null
            },
            errors: {
                name: ''
            }
        })
        if (!res.data.err_message){
            swal({
                title: "Chúc mừng",
                text: "Thêm loại khóa học thành công !!!",
                icon: "success",
            });
        }
        else{
            if (res.data.err_message === 'This category is existed'){
                swal({
                    title: "Cảnh báo",
                    text: "Loại khóa học đã tồn tại",
                    icon: "error",
                  });
            }
            else{
                swal({
                    title: "Cảnh báo",
                    text: "Chưa có nội dung cho loại khóa học",
                    icon: "error",
                  });
            }
        }

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
                                                                <button type="submit" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Đồng ý</button>
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light" onClick={() => this.props.history.goBack()}>Quay lại</button>
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
}

const mapStateToProps = (state) => {
    return { mainCategoryList: state.CategoryReducer.MainCategoryList }
}

export default connect(mapStateToProps)(CategoryAdd)
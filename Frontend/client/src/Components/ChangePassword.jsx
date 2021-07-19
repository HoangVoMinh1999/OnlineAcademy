import React, { Component } from 'react'

export default class ChangePassword extends Component {
    state = {
        values: {
            password: '',
            confirm_password: '',
        },
        errors: {
            password: '',
            confirm_password: '',
        }
    }

    handleOnChange = (event) => {
        let {name, value} = event.target;
        this.setState({
            ...this.state,
            values:{
                [name]: value
            }
        })
    }

    validateError = (name,value) => {
        let errMessage = '';
        if (name === 'password'){
            if (!value) {
                errMessage = 'Không được để trống mục nhập mật khẩu mới'
            }
        }
        else if (name === 'confirm_password'){
            if (!value) {
                errMessage = 'Không được để trống mục xác nhận mật khẩu mới'
            }
        }
        return errMessage
    }

    handleOnBlur = (event) => {
        let {name, value} = event.target;
        let err = this.validateError(name,value);
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: err,
            }
        })
    }

    renderError = (errMessage) => {
        if (errMessage != '') {
            return <div className="alert alert-danger">{errMessage}</div>
        }
        return ''
    }

    render() {
        return (
            <div>
                <div className="slider_area ">
                    <div className="single_slider d-flex align-items-center justify-content-center slider_bg_1">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="thumb" style={{ width: "100%", height: "100%" }}>
                                        <form action="" style={{ width: "100%", height: "100%" }}>
                                            <img src="img/courses/1.png" alt="" style={{ width: "100%", height: "100%" }} />
                                            <input type="file" id="file" />
                                        </form>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <form action="#" className="d-flex flex-column" >
                                        <div className="mt-10">
                                            <input type="text" name="password" value={this.state.values.password} placeholder="Mật khẩu mới" required className="single-input" onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                                            {this.renderError(this.state.errors.password)}
                                        </div>
                                        <div className="mt-10">
                                            <input type="text" name="confirm_password" value={this.state.values.confirm_password} placeholder="Xác nhận mật khẩu mới" required className="single-input" onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                                            {this.renderError(this.state.errors.confirm_password)}
                                        </div>
                                        <React.Fragment>
                                            <div className="mt-10 d-flex justify-content-around">
                                                <div className="button-group-area">
                                                    <button type='submit' href="#" className="genric-btn info circle">Lưu thông tin</button>
                                                </div>
                                                <div className="button-group-area">
                                                    <a href="#" className="genric-btn danger circle" onClick={() => this.props.history.goBack()}>Quay lại</a>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react'
import { Slider } from '../Components/Slider'
import { userService } from '../Services';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default class Login extends Component {
    state = {
        values: {
            username: '',
            password: '',
            password_02: '',
            email: '',
        },
        errors: {
            username: '',
            password: '',
            password_02: '',
            email: '',
        }
    }

    hanlleOnChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.keys(this.state.errors).every((k) => this.state.errors[k] === '')) {
            const res = await userService.register(this.state.values);
            if (!res.data.message){
                swal({
                    title: "Đăng ký thành công",
                    text: "Khách hàng vui lòng xác nhận qua email nha !!!",
                    icon: "success",
                    button: "Đồng ý",
                }).then(() => {
                    this.props.history.push('/login');
                });
            }
            else{
                if (res.data.message === "Username is not available!"){
                    swal({
                        title: "Cảnh báo",
                        text: "Username đã được sử dụng trước đó !!!",
                        icon: "error",
                        button: "Đồng ý",
                    });
                }
                else if (res.data.message === 'Email is not available!'){
                    swal({
                        title: "Cảnh báo",
                        text: "Email đã được sử dụng trước đó !!!",
                        icon: "error",
                        button: "Đồng ý",
                    });
                }
            }

        }
        else {
            swal({
                title: "Cảnh báo",
                text: "Vui lòng điền đầy đủ thông tin !!!",
                icon: "error",
                button: "Đồng ý",
            });
        }
    }

    validateError = (name,value) => {
        let errMessage = '';
        if (name === 'username'){
            if (!value) {
                errMessage = 'Không được để trống mục username'
            }
        }
        else if (name === 'password'){
            if (!value) {
                errMessage = 'Không được để trống mục password'
            }
        }
        else if (name === 'password_02'){
            if (!value) {
                errMessage = 'Không được để trống mục lặp lại password'
            }
        }
        else if (name === 'email'){
            if (!value) {
                errMessage = 'Không được để trống mục email'
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
                <div className="slider_area">
                    <div className="single_slider d-flex align-items-center justify-content-center slider_bg_1">
                        <div className="container">
                            <form onSubmit={this.handleSubmit}  style= {{margin:"20rem 25%"}}>
                                <div className="popup_box">
                                    <div className="popup_inner">
                                        <div className="logo text-center">
                                            <a href="#">
                                                <img src="img/form-logo.png" alt />
                                            </a>
                                        </div>
                                        <h3>Register</h3>
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12">
                                                <input type="text" placeholder="Enter username" value={this.state.values.username} name="username" onChange={this.hanlleOnChange} onBlur={this.handleOnBlur}/>
                                                {this.renderError(this.state.errors.username)}
                                            </div>
                                            <div className="col-xl-12 col-md-12">
                                                <input type="password" placeholder="Password" value={this.state.values.password} name="password" onChange={this.hanlleOnChange} onBlur={this.handleOnBlur}/>
                                                {this.renderError(this.state.errors.password)}
                                            </div>
                                            <div className="col-xl-12 col-md-12">
                                                <input type="password" placeholder="Confirm Password" value={this.state.values.password_02} name="password_02" onChange={this.hanlleOnChange} onBlur={this.handleOnBlur}/>
                                                {this.renderError(this.state.errors.password_02)}
                                            </div>
                                            <div className="col-xl-12 col-md-12">
                                                <input type="email" placeholder="Email" value={this.state.values.email} name="email" onChange={this.hanlleOnChange} onBlur={this.handleOnBlur}/>
                                                {this.renderError(this.state.errors.email)}
                                            </div>
                                            <div className="col-xl-12">
                                                <button type="submit" className="boxed_btn_orange">Sign up</button>
                                            </div>
                                        </div>
                                        <p className="doen_have_acc">Back to login ? <Link className="dont-hav-acc" to="/login">Login</Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

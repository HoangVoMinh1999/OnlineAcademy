import React, { Component } from 'react'
import { Slider } from '../Components/Slider'
import { userService } from '../Services';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export default class Login extends Component {
    state = {
        values: {
            username: '',
            password: '',
        },
        errors: {
            username: '',
            password: '',
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
        if (Object.keys(this.state.errors).every(t => this.state.errors[t] === '')){
            const res = await userService.login(this.state.values.username, this.state.values.password);
            if (!res.data.authenticated) {
                if (res.data.message === 'User is not confirmed !!!'){
                    swal({
                        title: "Cảnh báo",
                        text: "Vui lòng xác nhận tài khoản qua email !!!",
                        icon: "error",
                        button: "Xác nhận",
                    });
                }
                else{
                    swal({
                        title: "Cảnh báo",
                        text: "Username hoặc password không chính xác !!!",
                        icon: "error",
                        button: "Xác nhận",
                    });
                }
            }
            else{
                localStorage.user_accessToken = res.data.accessToken;
                const obj = parseJwt(res.data.accessToken);
                localStorage.user_UserId = obj.userId;
                localStorage.user_username = this.state.values.username;
                localStorage.user_IsAdmin = obj.IsAdmin.data[0];
                this.props.history.push('/');
            }
        }
        else{
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
            if (!value){
                errMessage = 'Vui lòng nhập username !!!'
            }
        }
        else if (name === 'password'){
            if (!value){
                errMessage = 'Vui lòng nhập password !!!'
            }
        }
        return errMessage;
    }

    handleOnBlur = (event) => {
        let {name,value} = event.target;
        let error = this.validateError(name,value);
        this.setState({
            errors : {
                ...this.state.errors,
                [name]: error,
            }
        })
    }

    renderError = (errMessage) => {
        if (errMessage !== '') {
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
                            <form onSubmit={this.handleSubmit} style= {{margin:"20rem 25%"}}>
                                <div className="popup_box ">
                                    <div className="popup_inner">
                                        <div className="logo text-center">
                                            <a href="#">
                                                <img src="img/form-logo.png" alt />
                                            </a>
                                        </div>
                                        <h3>Sign in</h3>
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12">
                                                <input type="text" placeholder="Enter username" value={this.state.values.username} name="username" onChange={this.hanlleOnChange} onBlur={this.handleOnBlur}/>
                                                {this.renderError(this.state.errors.username)}
                                            </div>
                                            <div className="col-xl-12 col-md-12">
                                                <input type="password" placeholder="Password" value={this.state.values.password} name="password" onChange={this.hanlleOnChange} onBlur={this.handleOnBlur}/>
                                                {this.renderError(this.state.errors.password)}
                                            </div>
                                            <div className="col-xl-12">
                                                <button type="submit" className="boxed_btn_orange">Sign in</button>
                                            </div>
                                        </div>
                                        <p className="doen_have_acc">Don’t have an account? <Link className="dont-hav-acc" to="/register">Sign Up</Link>
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

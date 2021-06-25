import React, { Component } from 'react'
import { Slider } from '../Components/Slider'
import { userService } from '../Services';
import { Link } from 'react-router-dom';
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
        const res = await userService.login(this.state.values.username, this.state.values.password);
        console.log(res.data)
    }
    render() {
        return (
            <div>
                <div className="slider_area ">
                    <div className="single_slider d-flex align-items-center justify-content-center slider_bg_1">
                        <div className="container">
                            <form  onSubmit={this.handleSubmit}>
                                <div className="popup_box ">
                                    <div className="popup_inner">
                                        <div className="logo text-center">
                                            <a href="#">
                                                <img src="img/form-logo.png" alt />
                                            </a>
                                        </div>
                                        <h3>Register</h3>
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12">
                                                <input type="text" placeholder="Enter username" value={this.state.values.username} name="username" onChange={this.hanlleOnChange} />
                                            </div>
                                            <div className="col-xl-12 col-md-12">
                                                <input type="password" placeholder="Password" value={this.state.values.password} name="password" onChange={this.hanlleOnChange} />
                                            </div>
                                            <div className="col-xl-12">
                                                <button type="submit" className="boxed_btn_orange">Sign in</button>
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

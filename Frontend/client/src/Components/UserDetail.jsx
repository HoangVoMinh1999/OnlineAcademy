import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../Services'
import swal from 'sweetalert';

export class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                name: '',
                address: '',
                phone: '',
                email: '',
                avartar: null,
                avatarURL: null,
            },
            errors: {
                name: '',
                address: '',
                phone: '',
                email: '',
            },
            editInformation: false,

        }
    }

    handleEditInformation = (event) => {
        event.preventDefault();
        swal({
            title: "Cảnh báo",
            text: "Bạn có chắc chắn muốn sửa thông tin cá nhân ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willOK) => {
                if (willOK) {
                    this.setState({
                        ...this.state,
                        editInformation: true
                    })
                }
            });
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

    handleLogout = (event) => {
        event.preventDefault();
        delete localStorage.user_accessToken ;
        delete localStorage.user_UserId;
        delete localStorage.user_username;
        delete localStorage.user_IsAdmin;
        this.props.history.push('/')
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const res = await userService.updateUserDetail(localStorage.user_UserId, this.state.values);
        if (!res.err_message){
            swal("Good job!", "You clicked the button!", "success", {
                button: "Aww yiss!",
              }).then((value) => {
                  this.setState({
                      ...this.state,
                      editInformation: false,
                  })
              });
        }
    }

    renderButton = () => {
        if (this.state.editInformation) {
            return <React.Fragment>
                <div className="mt-10 d-flex justify-content-around">
                    <div className="button-group-area">
                        <button type='submit' href="#" className="genric-btn info circle">Lưu thông tin</button>
                    </div>
                    <div className="button-group-area">
                        <a href="#" className="genric-btn danger circle" onClick={() => this.props.history.goBack()}>Quay lại</a>
                    </div>
                </div>
            </React.Fragment>
        }
        return <React.Fragment>
            <div className="mt-10 align-self-center">
                <div className="button-group-area">
                    <a href="#" className="genric-btn info circle" onClick={this.handleEditInformation}>Thay đổi thông tin</a>
                </div>
            </div>
            <div className="mt-10 align-self-center">
                <div className="button-group-area mt-40 " >
                    <Link to="/change-password" className="genric-btn primary circle">Thay đổi mật khẩu</Link>
                </div>
            </div>
            <div className="mt-10 align-self-center">
                <div className="button-group-area mt-40">
                    <a href="#" className="genric-btn danger circle" onClick={this.handleLogout}>Đăng xuất</a>
                </div>
            </div>
        </React.Fragment>
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
                                    <form action="#" className="d-flex flex-column" onSubmit={this.handleSubmit}>
                                        <div className="mt-10">
                                            <input type="text" name="name" value={this.state.values.name} placeholder="Họ và tên" required className="single-input" disabled={!this.state.editInformation} onChange={this.handleOnChange}/>
                                        </div>
                                        <div className="mt-10">
                                            <input type="text" name="address" value={this.state.values.address} placeholder="Địa chỉ" required className="single-input" disabled={!this.state.editInformation} onChange={this.handleOnChange}/>
                                        </div>
                                        <div className="mt-10">
                                            <input type="text" name="phone" value={this.state.values.phone} placeholder="Số điện thoại" required className="single-input" disabled={!this.state.editInformation} onChange={this.handleOnChange}/>
                                        </div>
                                        <div className="mt-10">
                                            <input type="email" name="email" value={this.state.values.email} placeholder="Email" required className="single-input" disabled={!this.state.editInformation} onChange={this.handleOnChange}/>
                                        </div>
                                        {this.renderButton()}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    async componentDidMount() {
        if (localStorage.hasOwnProperty('user_UserId')) {
            console.log(localStorage.user_UserId)
            const res = await userService.getUserDetail(localStorage.user_UserId);
            let user = {};
            if (!res.err_message) {
                user = {
                    name: res.data.name,
                    address: res.data.address,
                    phone: res.data.phone,
                    email: res.data.email,
                }
            }
            this.setState({
                ...this.state,
                values: user
            })
        }
    }
}

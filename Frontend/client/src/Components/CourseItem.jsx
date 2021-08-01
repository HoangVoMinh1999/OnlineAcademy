import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { courseService, watchlistService } from '../Services'
import swal from 'sweetalert';
import { GET_WATCHLIST } from '../Redux/Action/type';
import createAction from '../Redux/Action';

class CourseItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgData: null,
            imgURL: null,
            isFavorite: null,
        }
    }

    async componentDidUpdate(nextProps) {
        if (nextProps !== this.props) {
            const res = await courseService.getImage4CourseDetail(this.props.info.id);
            if (!res.data.err_message) {
                var reader = new FileReader();
                if (res.data.size > 0) {
                    reader.readAsDataURL(res.data);
                    reader.onloadend = () => this.setState({ imgData: reader.result, imgURL: URL.createObjectURL(res.data) })
                }
                else {
                    this.setState({
                        imgData: null,
                        imgURL: null,
                    })
                }
            }
        }
    }

    onChange = (pageNumber) => {
        this.props.history.push(`${this.props.match.url}?page=${pageNumber}`)
    }

    renderAddWatchList = () => {
        if (this.props.watchList.find(t => t.CourseId === this.props.info.id)){
            return <a href="#" className="genric-btn danger circle " onClick={this.handleOnClickDeleteWatchList}>Xóa khỏi danh sách yêu thích</a>
        }
        return <a href="#" className="genric-btn success circle" onClick={this.handleOnClickAddWatchList}>Thêm vào danh sách yêu thích</a>
    }

    handleOnClickDeleteWatchList = async (event) => {
        event.preventDefault();
        if (localStorage.user_UserId !== null && localStorage.user_UserId !== undefined) {
            const res = await watchlistService.delete(localStorage.user_UserId, this.props.info.id);
            if(localStorage.user_UserId !== null && localStorage.user_UserId !== undefined) {
                let res_watchlist = await watchlistService.getAllWatchList(localStorage.user_UserId);
                this.props.dispatch(
                    createAction(
                        GET_WATCHLIST,
                        res_watchlist.data.watchlist,
                    )
                )
            }
            swal({
                title: "Thành công!",
                text: "Xóa khóa học yêu thích thành công!",
                icon: "success",
                button: "OK!",
            });
        }
        else{
            swal("Lỗi !!!", "Vui lòng đăng nhập tài khoản !!!", "error", {
                button: "OK",
              }).then((value) => {
                window.location.assign("/login");
              });
        }
    }

    handleOnClickAddWatchList = async (event) => {
        event.preventDefault();
        if (localStorage.user_UserId !== null && localStorage.user_UserId !== undefined) {
            const res = await watchlistService.addWatchList(localStorage.user_UserId, this.props.info.id);
            if(localStorage.user_UserId !== null && localStorage.user_UserId !== undefined) {
                let res_watchlist = await watchlistService.getAllWatchList(localStorage.user_UserId);
                this.props.dispatch(
                    createAction(
                        GET_WATCHLIST,
                        res_watchlist.data.watchlist,
                    )
                )
            }
            swal({
                title: "Thành công!",
                text: "Thêm vào danh sách yêu thích thành công!",
                icon: "success",
                button: "OK!",
            });
        }
        else{
            swal("Lỗi !!!", "Vui lòng đăng nhập tài khoản !!!", "error", {
                button: "OK",
              }).then((value) => {
                window.location.assign("/login");
              });
        }
    }

    render() {
        const category = this.props.info.category_id === null ? null : this.props.categoryList.find(t => t.id === this.props.info.category_id)
        return (
            <div>
                <div className="single_courses" >
                    <div className="thumb" >
                        <Link to={`/course_detail/${this.props.info.id}`}>
                            <img src={this.state.imgURL === null ? "/img/courses/1.png" : this.state.imgURL} alt="Hình minh họa" style={{ width: "100%", height: "220px" }} />
                        </Link>
                    </div>
                    <div className="courses_info d-flex flex-column justify-content-between" style={{ height: "300px" }}>
                        <span>{category === null ? "Chưa có thông tin" : category.name}</span>
                        <h3><Link to={`/course_detail/${this.props.info.id}`}>{this.props.info.name}</Link></h3>
                        <div className="star_prise d-flex justify-content-between ">
                            <div className="star">
                                <i className="flaticon-mark-as-favorite-star" />
                                <span>({this.props.info.rate})</span>
                                <p>
                                    <i className="flaticon-user" />
                                    <span>{this.props.info.current_student}</span>
                                </p>
                            </div>
                            <div className="prise">
                                {this.props.info.sale !== 0 ? <span className="offer">{this.props.info.price} VND</span> : <p></p>}
                                <span className="active_prise">
                                    {this.props.info.price - this.props.info.price * this.props.info.sale / 100} VND
                                </span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            {this.renderAddWatchList()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    async componentDidMount() {
        const res = await courseService.getImage4CourseDetail(this.props.info.id);
        if (!res.data.err_message) {
            var reader = new FileReader();
            if (res.data.size > 0) {
                reader.readAsDataURL(res.data);
                reader.onloadend = () => this.setState({ imgData: reader.result, imgURL: URL.createObjectURL(res.data) })
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.ChildCategoryList,
        watchList : state.WatchListReducer.WatchList,
    }
}

export default connect(mapStateToProps)(CourseItem);
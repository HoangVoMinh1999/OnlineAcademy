import React, { Component } from 'react'
import createAction from '../../Redux/Action';
import { GET_LESSON_LIST } from '../../Redux/Action/type';
import { lessonService } from '../../Services'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import swal from 'sweetalert'

class LessonList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson_id: 0,
            lengthLessonList: 0
        }
    }

    handleDeleteButton = (id) => {
        swal("Bạn có chắc chắn muốn xóa bài học này không ???", {
            buttons: {
                confirm: {
                    text: "Xác nhận",
                    value: "confirm"
                },
                cancel: "Quay lại"
            },
        })
            .then(async (value) => {
                switch (value) {

                    case "confirm":
                        let res = await lessonService.delete(id);
                        const course_id = this.props.course_id;
                        res = await lessonService.getLessons4Course(course_id);
                        this.props.dispatch(
                            createAction(
                                GET_LESSON_LIST,
                                res.data
                            )
                        );
                }
            });
    }


    handleClickButtonConfirmDelete = async () => {
        const res = await lessonService.delete(this.state.lesson_id);
        this.setState({
            lesson_id: 0,
        })
    }

    renderContent = () => {
        return this.props.lessonList.map((lesson, index) => {
            return <tr key={index}>
                <td>{index}</td>
                <td>{lesson.title}</td>
                <td>{lesson.is_preview.data[0] === 1 ? "Cho phép" : "Không cho phép"}</td>
                <td>
                    <Link to={`/lesson-edit/${lesson.id}`}><button id="categoryEdit" title="Edit" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                    {/* Button trigger modal */}
                    <button type="button" id="categoryRemove" title="Trash" className="pd-setting-ed" onClick={() => this.handleDeleteButton(lesson.id)}>
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>

                </td>
            </tr>
        })
    }

    onChange = (pageNumber) => {
        this.props.history.push({
            pathname: this.props.match.url,
            search: `?page=${pageNumber}`
        })
    }

    render() {
        return (
            <div>
                <div className="product-status mg-b-30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap">
                                    <h4>Danh sách bài học</h4>
                                    <div className="add-product">
                                        <Link to={`/lesson-add/${this.props.course_id}`}>Thêm bài học</Link>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tiêu đề bài học</th>
                                                <th>Cho phép preview</th>
                                                <th>More</th>
                                            </tr>
                                        </thead>
                                        <tbody id="categoryContent">
                                            {this.renderContent()}
                                        </tbody>
                                    </table>
                                    <div className="custom-pagination">
                                        <Pagination className="align-self-center"
                                            showQuickJumper
                                            defaultPageSize={6}
                                            defaultCurrent={1}
                                            total={this.state.lengthLessonList}
                                            onChange={this.onChange} />
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
        const course_id = this.props.course_id;
        const res = await lessonService.getLessons4Course(course_id);
        this.props.dispatch(
            createAction(
                GET_LESSON_LIST,
                res.data
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lessonList: state.LessonReducer.LessonList,
    }
}

export default connect(mapStateToProps)(LessonList);
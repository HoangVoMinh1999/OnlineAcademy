import React, { Component } from 'react'
import createAction from '../../Redux/Action';
import { GET_LESSON_LIST } from '../../Redux/Action/type';
import { lessonService } from '../../Services'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class LessonList extends Component {

    constructor(props){
        super(props);
        this.state = {
            lesson_id : 0,
        }
    }

    handleDeleteButton = (id) => {
        this.setState({
            lesson_id : id,
        })
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
                <td>{lesson.is_preview === true ? "Cho phép" : "Không cho phép"}</td>
                <td>
                    <Link to={`/lesson-edit/${lesson.id}`}><button id="categoryEdit" title="Edit" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                    {/* Button trigger modal */}
                    <button type="button" id="categoryRemove" title="Trash" className="pd-setting-ed" data-toggle="modal" data-target="#deleteCategory" onClick={() => this.handleDeleteButton(lesson.id)}>
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                    {/* Modal */}
                    <div className="modal fade" id="deleteCategory" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-danger" id="exampleModalLongTitle">Thông báo</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="text-danger">Bạn có chắn chắn muốn xóa loại khóa học này không ???</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => this.handleClickButtonConfirmDelete()}>Đồng ý</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" >Quay lại</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </td>
            </tr>
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
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                        </ul>
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
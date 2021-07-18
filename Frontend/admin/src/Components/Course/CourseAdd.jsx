import React, { Component } from 'react';
import { categoryService, courseService } from '../../Services';
import swal from 'sweetalert'
import { connect } from 'react-redux';
import { GET_CHILD_CATEGORY_LIST, GET_LIST, GET_MAIN_CATEGORY_LIST } from '../../Redux/Action/type';
import createAction from '../../Redux/Action';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class CourseAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                name: '',
                category_id: null,
                rate: 0,
                price: 0,
                sale: 0,
                max_students: 0,
                current_student: 0,
                short_description: '',
                full_description: '',
                image: '',
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
            },
            activeTab: 'description',
            editorState: EditorState.createEmpty(),
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
        if (name === 'price') {
            if (!value) {
                errMessage = 'Giá khóa học không được để trống'
            }
        }
        if (name === 'max_students') {
            if (!value) {
                errMessage = 'Tên loại sản phẩm không được để trống'
            }
        }
        if (name === 'short_description') {
            if (!value) {
                errMessage = 'Tên loại sản phẩm không được để trống'
            }
        }
        return errMessage;
    };

    handleBlur = (e) => {
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

    handleSubmit = async (event) => {
        event.preventDefault();
        const body = this.state.values;
        const res = await courseService.addNewCourse(body)
        this.setState({
            values: {
                name: '',
                category_id: null,
                teacher_id : null,
                rate: 0,
                price: 0,
                sale: 0,
                max_students: 0,
                current_student: 0,
                short_description: '',
                full_description: '',
            },
            errors: {
                name: '',
                category_id: '',
                rate: '',
                price: '',
                sale: '',
                max_students: 0,
                short_description: '',
                full_description: '',
            }
        })
        if (!res.data.err_message) {
            swal({
                title: "Chúc mừng",
                text: "Thêm loại khóa học thành công !!!",
                icon: "success",
            });
        }
        else {
            if (res.data.err_message === 'This category is existed') {
                swal({
                    title: "Cảnh báo",
                    text: "Loại khóa học đã tồn tại",
                    icon: "error",
                });
            }
            else {
                swal({
                    title: "Cảnh báo",
                    text: "Chưa có nội dung cho loại khóa học",
                    icon: "error",
                });
            }
        }
    }

    renderCategoryList = () => {
        return this.props.categoryList.map((category) => {
            return <option value={category.id}>{category.name}</option>
        })
    }

    handleClickTab = (event) => {
        let { id } = event.target;
        this.setState({
            activeTab: id
        })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            values: {
                ...this.state.values,
                full_description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            }
        });
    };

    renderTeacherList = () => {
        return this.props.teacherList.map((teacher) => {
            return <option value={teacher.id}>{teacher.name}</option>
        })
    }

    render() {
        const { editorState } = this.state;
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
                                            <li className={this.state.activeTab === "description" ? "active" : ""}><a id="description" href="#description" onClick={this.handleClickTab}><i className="icon nalika-edit" aria-hidden="true" /> Thông tin khóa học</a></li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content custom-product-edit">
                                            <div className={`product-tab-list tab-pane fade ${this.state.activeTab === "description" ? "active in" : ""}`} id="description" >
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-edit" aria-hidden="true" /></span>
                                                                    <input type="text" className="form-control" name="name" value={this.state.values.name} placeholder="Tên khóa học" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.name)}
                                                                <select name="category_id" className="form-control pro-edt-select form-control-primary" value={this.state.values.category_id} placeholder="Loại khóa học" onChange={this.handleChange} onBlur={this.handleBlur}>
                                                                    <option value={null}>Loại khóa học</option>
                                                                    {this.renderCategoryList()}
                                                                </select>
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Giáo viên giảng dạy</span>
                                                                    <select name="teacher_id" className="form-control" value={this.state.values.teacher_id} placeholder="Giáo viên giảng dạy" onChange={this.handleChange} onBlur={this.handleBlur}>
                                                                        <option value>Giáo viên giảng dạy</option>
                                                                        {this.renderTeacherList()}
                                                                    </select>
                                                                </div>
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true" /></span>
                                                                    <input type="text" name="price" value={this.state.values.price === 0 ? "" : this.state.values.price} className="form-control" placeholder="Giá khóa học" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.price)}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-favorites-button" aria-hidden="true" /></span>
                                                                    <textarea className="form-control" name="short_description" value={this.state.values.short_description} cols="30" rows="10" placeholder="Mô tả ngắn gọn" onChange={this.handleChange} onBlur={this.handleBlur}></textarea>
                                                                </div>
                                                                {this.renderError(this.state.errors.short_description)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div class="lead-head">
                                                                <h3 style={{ color: 'white' }}>Mô tả chi tiết</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="coment-area">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <Editor
                                                                    editorState={editorState}
                                                                    editorStyle={{ border: "1px solid", backgroundColor: 'white' }}
                                                                    wrapperClassName="demo-wrapper"
                                                                    editorClassName="demo-editor"
                                                                    onEditorStateChange={this.onEditorStateChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="text-center custom-pro-edt-ds">
                                                                <button type="submit" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Save</button>
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light" onClick={() => this.props.history.goBack()}>Discard</button>
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
            </div>
        )
    }
    async componentDidMount() {
        if (this.props.categoryList.length === 0) {
            const res = await categoryService.getAllCategories();
            this.props.dispatch(
                createAction(
                    GET_LIST,
                    res.data.listCategory
                )
            )
            this.props.dispatch(
                createAction(
                    GET_MAIN_CATEGORY_LIST,
                    res.data.listCategory
                )
            )
            this.props.dispatch(
                createAction(
                    GET_CHILD_CATEGORY_LIST,
                    res.data.listCategory
                )
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.ChildCategory,
        teacherList: state.UserReducer.TeacherList,
    }
}

export default connect(mapStateToProps)(CourseAdd);
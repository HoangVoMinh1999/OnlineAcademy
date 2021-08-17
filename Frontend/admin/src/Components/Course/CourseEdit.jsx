import React, { Component } from 'react';
import { categoryService, courseService, lessonService } from '../../Services';
import swal from 'sweetalert'
import { connect } from 'react-redux';
import { GET_LIST } from '../../Redux/Action/type';
import createAction from '../../Redux/Action';
import LessonList from '../Lesson/LessonList';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class CourseEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'description',
            values: {
                name: '',
                category_id: null,
                teacher_id: null,
                rate: 0,
                price: 0,
                sale: 0,
                max_students: 0,
                current_student: 0,
                short_description: '',
                full_description: '',
                IsFinish: false,
                IsCompleted: false,
                sale_info: '',
                selectedImage: null,
                selectedImageData: null,
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
            editorState: EditorState.createEmpty(),

        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "IsFinish" || name==="IsCompleted") {
            this.setState({ values: { ...this.state.values, [name]: e.target.checked } })
        }
        else {
            this.setState({ values: { ...this.state.values, [name]: value } })
        }

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
        const id = this.props.match.params.id;
        if (this.state.selectedImage === undefined) {
            this.setState({
                ...this.state,
                values: {
                    ...this.state.values,
                    selectedImage: null,
                    selectedImageData: null,
                }
            })
        }
        const res = await courseService.updateCourse(id, body)
        if (!res.data.err_message) {
            swal({
                title: "Chúc mừng",
                text: "Cập nhật khóa học thành công !!!",
                icon: "success",
            });
        }
        else {
            if (res.data.err_message === 'This course is existed') {
                swal({
                    title: "Cảnh báo",
                    text: "Khóa học đã tồn tại",
                    icon: "error",
                });
            }
            else {
                swal({
                    title: "Cảnh báo",
                    text: "Chưa có nội dung cho khóa học",
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

    renderTeacherList = () => {
        return this.props.teacherList.map((teacher) => {
            return <option value={teacher.id}>{teacher.name}</option>
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

    onChangeImage = (event) => {
        this.setState({
            values: {
                ...this.state.values,
                selectedImage: URL.createObjectURL(event.target.files[0]),
                selectedImageData: event.target.files[0]
            }
        })
    }

    fileUploadHandler = async (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('image', this.state.values.selectedImageData);
        const id = this.props.match.params.id;
        const res = await courseService.updateCourseImage(id, fd);
        if (!res.data.err_message) {
            swal({
                title: "Chúc mừng",
                text: "Cập nhật hình ảnh khóa học thành công !!!",
                icon: "success",
            });
        }
        else {
            swal({
                title: "Cảnh báo",
                text: "Cập nhật hình ảnh khóa học không thành công !!!",
                icon: "error",
            });
        }

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
                                            <li className={this.state.activeTab === "reviews" ? "active" : ""}><a id="reviews" href="#reviews" onClick={this.handleClickTab}><i className="icon nalika-picture" aria-hidden="true" /> Hình ảnh</a></li>
                                            <li className={this.state.activeTab === "INFORMATION" ? "active" : ""}><a id="INFORMATION" href="#INFORMATION" onClick={this.handleClickTab}><i className="icon nalika-chat" aria-hidden="true" /> Bài học</a></li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content custom-product-edit">
                                            <div className={`product-tab-list tab-pane fade ${this.state.activeTab === "description" ? "active in" : ""}`} id="description">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Tên khóa học</span>
                                                                    <input type="text" className="form-control" name="name" value={this.state.values.name} placeholder="Tên khóa học" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.name)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Loại khóa học</span>
                                                                    <select  name="category_id" className="form-control" value={this.state.values.category_id} placeholder="Loại khóa học" onChange={this.handleChange} onBlur={this.handleBlur}>
                                                                        <option value>Loại khóa học</option>
                                                                        {this.renderCategoryList()}
                                                                    </select>
                                                                </div>
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Giáo viên giảng dạy</span>
                                                                    <select name="teacher_id" className="form-control" value={this.state.values.teacher_id} placeholder="Giáo viên giảng dạy" onChange={this.handleChange} onBlur={this.handleBlur}>
                                                                        <option value>Giáo viên giảng dạy</option>
                                                                        {this.renderTeacherList()}
                                                                    </select>
                                                                </div>
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Giá khóa học</span>
                                                                    <input type="text" name="price" value={this.state.values.price} className="form-control" placeholder="Giá khóa học" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.price)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Giảm giá(%)</span>
                                                                    <input type="text" name="sale" value={this.state.values.sale} className="form-control" placeholder="Giảm giá(%)" onChange={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.sale)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Đã hoàn thành khóa học</span>
                                                                    <input type="checkbox" name="IsCompleted" checked={this.state.values.IsCompleted} className="form-control" onClick={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.max_students)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Vô hiệu hóa khóa học</span>
                                                                    <input type="checkbox" name="IsFinish" checked={this.state.values.IsFinish} className="form-control" onClick={this.handleChange} onBlur={this.handleBlur} />
                                                                </div>
                                                                {this.renderError(this.state.errors.rate)}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon">Mô tả chung</span>
                                                                    <textarea className="form-control" name="short_description" value={this.state.values.short_description} cols="30" rows="8" placeholder="Mô tả ngắn gọn" onChange={this.handleChange} onBlur={this.handleBlur}></textarea>
                                                                </div>
                                                                {this.renderError(this.state.errors.short_description)}
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <p className="input-group-addon">Thông tin giảm giá</p>
                                                                    <textarea className="form-control" name="sale_info" value={this.state.values.sale_info} cols="30" rows="4" placeholder="Mô tả ngắn gọn" onChange={this.handleChange} onBlur={this.handleBlur}></textarea>
                                                                </div>
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
                                                    <div className="row" style={{marginTop:"2rem"}}>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="text-center custom-pro-edt-ds">
                                                                <button type="submit" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Lưu thay đổi</button>
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light" onClick={() => this.props.history.goBack()}>Hủy</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className={`product-tab-list tab-pane fade ${this.state.activeTab === "reviews" ? "active in" : ""}`} id="reviews">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <form onSubmit={this.fileUploadHandler} encType="multipart/form-data">
                                                            <div className="row">
                                                                <div className="review-content-section">
                                                                    <div className="input-group mg-b-pro-edt">
                                                                        <span className="input-group-addon"><i className="icon nalika-edit" aria-hidden="true" /></span>
                                                                        <input type="file" className="form-control" accept='image/*' name="image" placeholder="Tên khóa học" onChange={this.onChangeImage} onBlur={this.handleBlur} />
                                                                    </div>
                                                                    <img src={this.state.values.selectedImage} alt="Hình ảnh khóa học" />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <div className="text-center custom-pro-edt-ds">
                                                                        <button type="submit" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Lưu thay đổi</button>
                                                                        <button type="button" className="btn btn-ctl-bt waves-effect waves-light" onClick={() => this.props.history.goBack()}>Hủy</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className={`product-tab-list tab-pane fade ${this.state.activeTab === "INFORMATION" ? "active in" : ""}`} id="INFORMATION" >
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <LessonList course_id={this.props.match.params.id}></LessonList>
                                                    </div>
                                                </div>
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
        const id = this.props.match.params.id;
        const detail = await courseService.getCourseDetail(id);
        const newCourse = {
            name: detail.data.name,
            category_id: detail.data.category_id,
            teacher_id : detail.data.teacher_id,
            rate: detail.data.rate,
            price: detail.data.price,
            sale: detail.data.sale,
            max_students: detail.data.max_students,
            current_student: detail.data.current_student,
            short_description: detail.data.short_description,
            full_description: detail.data.full_description,
            sale_info: detail.data.sale_info,
            IsFinish: detail.data.IsFinish.data[0] === 1 ? true : false,
            IsCompleted: detail.data.IsCompleted.data[0] === 1 ? true : false,
            selectedImage: null,
            selectedImageData: null,
        }
        //--- WYSIWYG
        const blocksFromHtml = htmlToDraft(newCourse.full_description);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);

        //--- PHOTO
        let res = await courseService.getImage4CourseDetail(id);
        if (!res.err_message) {
            var reader = new FileReader();
            reader.readAsDataURL(res.data);
            reader.onloadend = function () {
                var base64data = reader.result;
                console.log(base64data);
                newCourse.selectedImageData = base64data;
                var url = URL.createObjectURL(res.data);
                newCourse.selectedImage = url;
            }
        }

        this.setState({
            ...this.state,
            values: newCourse,
            lessonValues: {
                course_id: id
            },
            editorState: editorState,
        })
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.CategoryReducer.ChildCategory,
        teacherList: state.UserReducer.TeacherList,
    }
}

export default connect(mapStateToProps)(CourseEdit);
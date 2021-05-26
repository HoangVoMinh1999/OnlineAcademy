import React, { Component } from 'react'
import Action from "../../Redux/Action/action"

class CategoryInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            values: {
                name:'',
                category_id:''
            },
            errors: {
                name:''
            }
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({values: {...this.state.values, [name]: value}})
    }

    validateData = (name,value) => {
        let errMessage = '';
        if (name = 'name'){
            if (!value){
                errMessage = 'Tên loại sản phẩm không được để trống'
            }
        }
        return errMessage;
    }

    handleBlur = (e) => {
        console.log('Blur')
        const {name, value} = e.target;
        const errMessage = this.validateData(name,value);
        this.setState({errors: {...this.state.errors, [name]: errMessage}})
    }

    renderError = (errMessage) => {
        console.log(this.state.errors.name)
        if (errMessage != ''){
            console.log(errMessage)
            return <div className= "alert alert-danger">{errMessage}</div>
        }
        return ''
    }

    render() {
        return (
            <div>
                {/* Single pro tab start*/}
                <div className="single-product-tab-area mg-b-30">
                    {/* Single pro tab review Start*/}
                    <div className="single-pro-review-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="review-tab-pro-inner">
                                        <ul id="myTab3" className="tab-review-design">
                                            <li className="active"><a href="#description"><i className="icon nalika-edit" aria-hidden="true" /> Product Info</a></li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content custom-product-edit">
                                            <form action="">
                                                <div className="product-tab-list tab-pane fade active in" id="description">
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="review-content-section">
                                                                <div className="input-group mg-b-pro-edt">
                                                                    <span className="input-group-addon"><i className="icon nalika-user" aria-hidden="true" /></span>
                                                                    <input id="categoryName" type="text" name="name" value={this.state.values.name} className="form-control" placeholder="Name" onChange={this.handleChange} onBlur={this.handleBlur}/>
                                                                </div>
                                                                {this.renderError(this.state.errors.name)}
                                                                <select name="select" class="form-control pro-edt-select form-control-primary">
                                                                    <option value="opt1">Select One Value Only</option>
                                                                    <option value="opt2">2</option>
                                                                    <option value="opt3">3</option>
                                                                    <option value="opt4">4</option>
                                                                    <option value="opt5">5</option>
                                                                    <option value="opt6">6</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="text-center custom-pro-edt-ds">
                                                                <button id="btnSave" type="submit" className="btn btn-ctl-bt waves-effect waves-light m-r-10">Save</button>
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light">Discard</button>
                                                            </div>
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
        )
    }
}

const mapDispacthtoProps = (dispatch) => {
    return {
        addCategory: (newCategory) => {
            dispatch({
                type: Action.ADD_NEW_ITEM,
                payload: newCategory,
            });
        },
        updateCategory: (category) => {
            dispatch({
                type : Action.UPDATE_ITEM,
                payload: category,
            })
        },
    }
}

export default connect(null,mapDispacthtoProps)(CategoryInfo)
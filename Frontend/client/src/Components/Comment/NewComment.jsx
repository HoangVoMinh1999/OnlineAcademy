import React, { Component } from 'react'

export default class NewComment extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            newComment: {
                rate: 1,
                comment: '1233',
            },
        }
    }

    handleOnChangeComment = (event) => {
        console.log(event)
        let { name, value } = event.target;
        this.setState({
            ...this.state,
            newComment: {
                [name]: value,
            }
        })
    }

    render() {
        return (
            <div className="d-flex flex-column">
                <div>
                    <h1>Feedback về khóa học</h1>
                </div>
                <div>
                    <form className="rating">
                        <label>
                            <input type="radio" name="rate" value="1" checked={this.state.newComment.rate === 1} onChange={this.handleOnChangeComment} />
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="rate" value="2" checked={this.state.newComment.rate === 2} onChange={this.handleOnChangeComment} />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="rate" value="3" checked={this.state.newComment.rate === 3} onChange={this.handleOnChangeComment} />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="rate" value="4" checked={this.state.newComment.rate === 4} onChange={this.handleOnChangeComment} />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="rate" value="5" checked={this.state.newComment.rate === 5} onChange={this.handleOnChangeComment} />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                    </form>
                </div>
                <div>
                    <form>
                        <textarea name="comment" value={this.state.newComment.comment} id="" cols="30" rows="10" placeholder="Nội dung nhập xét" style={{ width: '100%', marginBottom: '10px' }} onChange={this.handleOnChangeComment}></textarea>
                    </form>
                </div>
                <button type="submit" style={
                    {
                        width: "50%",
                        padding: "10px 20px",
                        border: 'none',
                    }
                }>
                    Xác nhận
                </button>
            </div>
        )
    }
}

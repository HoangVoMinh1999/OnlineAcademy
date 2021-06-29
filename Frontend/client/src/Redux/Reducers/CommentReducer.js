import { GET_COMMENT_LIST } from "../Action/type"

const stateComment = {
    CommentList : [],
}

export const CommentReducer = (state = stateComment,action) => {
    switch (action.type){
        case GET_COMMENT_LIST :{
            let commentList = state.CommentList;
            commentList = action.payload;
            state.CommentList = commentList
            return {...state}
        }
    }
    return {...state}
}
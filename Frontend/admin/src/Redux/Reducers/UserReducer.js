import { GET_USER_LIST } from "../Action/type"

const stateUser = {
    UserList : [],
}
 
export const UserReducer = (state = stateUser, action) => {
    switch (action.type){
        case GET_USER_LIST: {
            let userList = [...state.UserList];
            userList = action.payload;
            state.UserList = userList;
            return {...state}
        }
    }
    return {...state}
}
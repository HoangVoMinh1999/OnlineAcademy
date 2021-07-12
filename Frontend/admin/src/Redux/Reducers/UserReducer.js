import { GET_USER_LIST } from "../Action/type"

const stateUser = {
    UserList : [],
    StudentList : [],
    TeacherList : [],
    AdminList : [],
}
 
export const UserReducer = (state = stateUser, action) => {
    switch (action.type){
        case GET_USER_LIST: {
            let userList = [...state.UserList];
            userList = action.payload;
            state.UserList = userList;

            let teacherList = userList.filter(t => t.IsTeacher.data[0] === 1);
            state.TeacherList = teacherList;

            let studentList = userList.filter(t => t.IsTeacher.data[0] === 0 && t.IsAdmin.data[0] === 0);
            state.StudentList = studentList;

            let adminList = userList.filter(t => t.IsAdmin.data[0] === 1);
            state.AdminList = adminList;

            return {...state}
        }
    }
    return {...state}
}
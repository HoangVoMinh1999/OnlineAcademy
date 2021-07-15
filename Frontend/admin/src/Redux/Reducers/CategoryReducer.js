import {
    UPDATE_ITEM,
    GET_LIST,
    GET_MAIN_CATEGORY_LIST,
    GET_CHILD_CATEGORY_LIST
} from '../Action/type'

const stateCategory = {
    CategoryList: [],
    MainCategoryList: [],
    ChildCategory: [],
    CategoryDetail: null,
}

export const CategoryReducer = (state = stateCategory, action) => {
    switch (action.type) {
        case GET_LIST: {
            //--- CategoryList
            let categoryList = [...state.CategoryList];
            categoryList = action.payload;
            state.CategoryList = categoryList;

            return {
                ...state
            }
        }
        case GET_MAIN_CATEGORY_LIST: {
            let mainCategoryList = action.payload.filter(t => t.category_id === null);
            state.MainCategoryList = mainCategoryList;
            return {...state}
        }

        case GET_CHILD_CATEGORY_LIST:{
            //--- ChildCategoryList
            let childCategoryList = [...state.ChildCategory];
            childCategoryList = action.payload.filter(t => t.category_id !== null);
            state.ChildCategory = childCategoryList;

            return {...state}
        }
    }
    return {
        ...state
    }
}
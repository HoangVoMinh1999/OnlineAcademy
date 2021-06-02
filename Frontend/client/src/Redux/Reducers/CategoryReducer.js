import { GET_CATEGORY_LIST } from "../Action/type"

const stateCategory = {
    CategoryList : [],
    MainCategoryList : [],
    ChildCategoryList : []
}
export const CategoryReducer = (state = stateCategory,action) => {
    switch (action.type){
        case GET_CATEGORY_LIST : {
            let categoryList = state.CategoryList;
            categoryList = action.payload;
            state.CategoryList = categoryList;

            let mainCategoryList = state.MainCategoryList;
            mainCategoryList = categoryList.filter(t => t.category_id === null);
            state.MainCategoryList = mainCategoryList;

            let childCategoryList = state.ChildCategoryList;
            childCategoryList = categoryList.filter( t => t.category_id !== null);
            state.ChildCategoryList = childCategoryList;

            return {...state}
        }
    }
    return {...state}
}
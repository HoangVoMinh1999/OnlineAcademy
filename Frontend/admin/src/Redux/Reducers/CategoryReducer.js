import Action from '../Action/action'

const stateCategory = {
    CategoryList : [],
    MainCategoryList: [],
}

export const  CategoryReducer = (state = stateCategory,action) => {
    switch (action.type) {
        case 'UPDATE_LIST': {
            //--- CategoryList
            let categoryList = [...state.CategoryList];
            categoryList = action.categoryList ;
            state.CategoryList = categoryList;

            //--- MainCategoryList
            let mainCategoryList = [...state.MainCategoryList];
            mainCategoryList = action.categoryList.filter(t => t.category_id === null);
            state.MainCategoryList = mainCategoryList;
            return {...state}
        }
    }
    return {...state}
}
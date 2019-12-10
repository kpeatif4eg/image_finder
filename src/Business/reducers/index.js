const initStore = {
    imgs: [],
    error: '',
    isLoad: false,
    defaultListOfImages: [],
    isEditTags: false,
    bySmaller: true,
};

const reducer = (state = initStore, action) => {
    switch (action.type) {
        case 'SET_IMG_STORE':
            return {
                ...state, imgs: action.payload, defaultListOfImages: action.payload, isLoad: false,
            };
        case 'ERR_IMG_STORE':
            return { ...state, error: action.payload };
        case 'START_SET_IMG_STORE':
            return { ...state, isLoad: true };
        case 'SORT_ORDER':
            return { ...state, bySmaller: !state.bySmaller };
        case 'CHANGE_STORE':
            return { ...state, imgs: action.payload };
        case 'IS_EDIT_TAGS':
            return { ...state, isEditTags: !state.isEditTags };
        default:
            return state;
    }
};

export default reducer;

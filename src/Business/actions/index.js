import { URL, API_KEY } from '../../static/constants';

export const getImgs = () => (
    (dispatch) => {
        dispatch({ type: 'START_SET_IMG_STORE' });
        fetch(`${URL}${API_KEY}&q=cats&image_type=all&per_page=20`)
            .then(response => response.json())
            .then(response => dispatch({ type: 'SET_IMG_STORE', payload: response.hits }))
            .catch(err => dispatch({ type: 'ERR_IMG_STORE', payload: err.message }));
    }
);

export const searchImgs = request => (
    (dispatch) => {
        fetch(`${URL}${API_KEY}&q=${request}&image_type=all&per_page=20`)
        .then(response => response.json())
        .then(response => dispatch({ type: 'SET_IMG_STORE', payload: response.hits }))
        .catch(err => dispatch({ type: 'ERR_IMG_STORE', payload: err.message }));
    }
);
export const changeStore = changedItem => ({ type: 'CHANGE_STORE', payload: changedItem });

export const sortImagesBy = sorted => ({ type: 'CHANGE_STORE', payload: sorted });

export const sortOrder = () => ({ type: 'SORT_ORDER' });

export const searchTags = searched => ({ type: 'CHANGE_STORE', payload: searched });

export const changeTags = tags => ({ type: 'CHANGE_STORE', payload: tags });

export const isEditTagsHandler = () => ({ type: 'IS_EDIT_TAGS' });

import axios from 'axios';
import { fetchCategoryStart, fetchCategorySuccess, fetchCategoryFailure } from '../reducer/categoryReducer';


export const fetchCategory = () => async (dispatch) => {
    dispatch(fetchCategoryStart());

    try {
        const response = await axios.get(`${window.env.API_URL}/item-category`)

        const data = await response.data.result;
        dispatch(fetchCategorySuccess(data));
    } catch (error) {
        dispatch(fetchCategoryFailure(error.message));
    }
};
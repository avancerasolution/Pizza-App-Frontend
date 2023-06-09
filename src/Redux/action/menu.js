import axios from 'axios';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../reducer/menuReducer';

export const fetchMenuData = () => async (dispatch) => {
    dispatch(fetchDataStart());

    try {
        const response = await axios.get(`${window.env.API_URL}/item`)

        const data = await response.data.result;
        dispatch(fetchDataSuccess(data));
    } catch (error) {
        dispatch(fetchDataFailure(error.message));
    }
};
import {GET_SHOPDETAIL } from "../ActionTypes"
import axios from "axios"
import { baseURL } from "../../utils/baseURL"

export const getShopDetail = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "reviews")
            .then((response) => {
                dispatch({ type: GET_SHOPDETAIL, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}
import axios from "axios"
import { baseURL } from "../../utils/baseURL"
import { GET_PRODUCT, LOADING_PRODUCT } from "../ActionTypes"

const handleLoading = () => (dispatch) => {
    dispatch({ type: LOADING_PRODUCT })
}

export const getProduct = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "product")
            .then((response) => {
                dispatch(handleLoading())
                setTimeout(() => {
                    dispatch({ type: GET_PRODUCT, payload: response.data })
                }, 2000)
             
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}
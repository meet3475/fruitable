import axios from "axios"
import { baseURL } from "../../utils/baseURL"
import { GET_PRODUCT } from "../ActionTypes"

export const getProduct = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "product")
            .then((response) => {
               dispatch({type: GET_PRODUCT, payload: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}
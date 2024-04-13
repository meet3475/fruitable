import axios from "axios"
import { baseURL } from "../../utils/baseURL"
import { GET_CART } from "../ActionTypes";

export const getCart = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "fruites")
            .then((response) => {
                dispatch({ type: GET_CART, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}
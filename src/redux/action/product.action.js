import axios from "axios"
import { baseURL } from "../../utils/baseURL"
import { ADD_PRODUCT, DELETE_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LOADING_PRODUCT, UPDATE_PRODUCT } from "../ActionTypes"

const handleLoading = () => (dispatch) => {
    dispatch({ type: LOADING_PRODUCT })
}

const handleError = (error) => (dispatch) => {
    dispatch({ type: ERROR_PRODUCT, payload: error })
}

export const getProduct = () => async (dispatch) => {
    try {
        // dispatch(handleLoading()) 
        await axios.get("localhost:8000/api/v1/products/list-products")
            .then((response) => {

                setTimeout(() => {
                    dispatch({ type: GET_PRODUCT, payload:response.data })
                }, 2000)
                console.log(response.data);
            })
            .catch((error) => {
                // dispatch(handleError(error.message))
            })
    } catch (error) {
        // dispatch(handleError(error.message))
    }
}



export const addProduct = (data) => async (dispatch) => {
    dispatch(handleLoading())
    try {
        await axios.post("localhost:8000/api/v1/products/add-products", data)
            .then((response) => {
                console.log(response.data);
                dispatch({ type: ADD_PRODUCT, payload: response.data })
            })
            .catch((error) => {
                dispatch(handleError(error.message))
            })
    } catch (error) {
        dispatch(handleError(error.message))
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    dispatch(handleLoading())
    try {
        await axios.delete("localhost:8000/api/v1/products/delete-products/" + id)
            .then(dispatch({ type: DELETE_PRODUCT, payload: id }))
            .catch((error) => {
                dispatch(handleError(error.message))
            })
    } catch (error) {
        dispatch(handleError(error.message))
    }
}

export const editProduct = (data) => async (dispatch) => {
    dispatch(handleLoading())
    try {
        await axios.put("localhost:3000/api/v1/products/update-products/" + data._id, data)
            .then((response) => {
                dispatch({ type: UPDATE_PRODUCT, payload: data })
            })
            .catch((error) => {
                dispatch(handleError(error.message))
            })
    } catch (error) {
        dispatch(handleError(error.message))
    }
}
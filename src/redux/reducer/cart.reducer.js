import {GET_CART } from "../ActionTypes";

const initialState = {
    isLoading: false,
    reviews: [],
    error: null
}

export const  cartReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
       
        case GET_CART:
            return {
                isLoading: false,
                fruites: action.payload,
                error: null
            }

        default:
            return state
    }
}
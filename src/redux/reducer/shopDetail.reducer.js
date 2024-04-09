import {GET_SHOPDETAIL } from "../ActionTypes";

const initialState = {
    isLoading: false,
    reviews: [],
    error: null
}

export const reviewReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_SHOPDETAIL:
            return {
                isLoading: false,
                reviews: action.payload,
                error: null
            }

        default:
            return state
    }
}
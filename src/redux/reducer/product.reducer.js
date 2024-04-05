import { GET_PRODUCT, LOADING_PRODUCT } from "../ActionTypes";

const initialState = {
    isLoading: false,
    product: [],
    error: null
}

export const productReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {


        case LOADING_PRODUCT:
            console.log("loading...");
            return {
                ...state,
                isLoading: true,
            }

        case GET_PRODUCT:
            return {
                isLoading: false,
                product: action.payload,
                error: null
            }
        default:
            return state
    }
}

import { GET_PRODUCT } from "../ActionTypes";

const initialState = {
    isLoading: false,
    product: [],
    error: null
}

export const productReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
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

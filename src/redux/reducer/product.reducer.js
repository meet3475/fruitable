import { ADD_PRODUCT, DELETE_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LOADING_PRODUCT, UPDATE_PRODUCT } from "../ActionTypes";

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

        case ERROR_PRODUCT:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case GET_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                // error: null
            }

        case ADD_PRODUCT:
            return {
                isLoading: false,
                product: state.product.concat(action.payload),
                error: null
            }

        case DELETE_PRODUCT:
            return {
                isLoading: false,
                product: state.product.filter((v) => v.id !== action.payload),
                error: null
            }

        case UPDATE_PRODUCT:
            return {
                isLoading: false,
                product: state.product.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                error: null
            }


        default:
            return state
    }
}

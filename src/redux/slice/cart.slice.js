import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.cart.findIndex((v) => v.Pid === action.payload);
            console.log(index);

            if (index !== -1) {
                state.cart[index].qty++;
            } else {
                state.cart.push({ Pid: action.payload, qty: 1 });
            }

            console.log(action);

        },
        plusToCart: (state, action) => {
            console.log(action.payload);

            const index = state.cart.findIndex((v) => v.Pid === action.payload);

            state.cart[index].qty++



    
        },
        minusToCart: (state, action) => {

            console.log(action.payload);

            const index = state.cart.findIndex((v) => v.Pid === action.payload);
            
            state.cart[index].qty--

        },
        deleteToCart: (state, action) => {

            console.log(action.payload);

            state.cart = state.cart.filter((v) => v.Pid !== action.payload);
            
    
        }

    }
})

export const { addToCart, plusToCart, minusToCart, deleteToCart } = cartSlice.actions;

export default cartSlice.reducer
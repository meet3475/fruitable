import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reduce";
import { counterReducer } from "./counter.reduce";
import { productReducer } from "./product.reducer";
import { fruitesReducer } from "./shop.reducer";
import { reviewReducer } from "./review.reducer";
import { cartReducer } from "./cart.reducer";
import counterSlice from "../slice/counter.slice";


export const RootReducer = combineReducers({
    facilities: facilitiesReducer,
    counter: counterReducer,
    product: productReducer,
    fruites: fruitesReducer,
    reviews: reviewReducer,
    cart: cartReducer,
    counter_slice : counterSlice
})
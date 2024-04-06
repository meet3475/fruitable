import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reduce";
import { counterReducer } from "./counter.reduce";
import { productReducer } from "./product.reducer";
import { fruitesReducer } from "./shop.reducer";
import { reviewReducer } from "./shopDetail.reducer";

export const RootReducer = combineReducers({
    facilities : facilitiesReducer,
    counter : counterReducer,
    product : productReducer,
    fruites : fruitesReducer,
    reviews :  reviewReducer
})
import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reduce";
import { counterReducer } from "./counter.reduce";
import { productReducer } from "./product.reducer";

export const RootReducer = combineReducers({
    facilities : facilitiesReducer,
    counter : counterReducer,
    product : productReducer
})
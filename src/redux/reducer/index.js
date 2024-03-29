import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reduce";
import { counterReducer } from "./counter.reduce";

export const RootReducer = combineReducers({
    facilities : facilitiesReducer,
    counter : counterReducer
})
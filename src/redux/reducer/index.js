import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reduce";

export const RootReducer = combineReducers({
    facilities : facilitiesReducer
})
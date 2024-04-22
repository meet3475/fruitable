import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const initialState = {
    isLoading: false,
    coupon: [],
    error: null
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        getStartCoupon: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        gettoCoupon: (state, action) => {
            state.coupon = action.payload;
            state.isLoading = false;
        },
        getInvCoupon: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addStartCoupon: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        addtoCoupon: (state, action) => {
            state.coupon = state.coupon.concat(action.payload);
            state.isLoading = false;
        },
        addInvCoupon: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        removeStartCoupon: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        removetoCoupon: (state, action) => {
            state.coupon = state.coupon.filter((v) => v.id !== action.payload);
            state.isLoading = false;
        },
        removeInvCoupon: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateStartCoupon: (state, action) => {
            state.isLoading = true;
           
        },
        updatetoCoupon: (state, action) => {
            state.coupon = state.coupon.map((v) => {
                if (v.id !== action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            });
            state.isLoading = false;
        },
        updateInvCoupon: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})



export default couponSlice.reducer








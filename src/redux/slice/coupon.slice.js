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
            state.isLoading = false;
            state.coupon = action.payload;
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
            state.isLoading = false;
            state.coupon = action.payload;
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
            state.isLoading = false;
            state.coupon = state.coupon.filter((v) => v.id !== action.payload);;
        },
        removeInvCoupon: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateStartCoupon: (state, action) => {
            state.isLoading = true;
           
        },
        updatetoCoupon: (state, action) => {
            state.isLoading = false;
            state.coupon = state.coupon.map((v) => {
                if (v.id !== action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        },
        updateInvCoupon: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export const { getStartCoupon, gettoCoupon, getInvCoupon, addStartCoupon, addtoCoupon, addInvCoupon, removeStartCoupon, removetoCoupon, removeInvCoupon, updateStartCoupon, updatetoCoupon, updateInvCoupon } = couponSlice.actions;


export const getCoupon = () => async (dispatch) => {
    dispatch(getStartCoupon());
    try {
        const response = await axios.get(baseURL + "coupon");
        dispatch(gettoCoupon(response.data));
    } catch (error) {
        dispatch(getInvCoupon(error.message));
    }
}


export const addCoupon = (data) => async (dispatch) => {
    dispatch(addStartCoupon());
    try {
        const response = await axios.post(baseURL + "coupon", data);
        dispatch(addtoCoupon(response.data))
    } catch (error) {
        dispatch(addInvCoupon(error.message))
    }
}

export const removeCoupon = (id) => async (dispatch) => {
    dispatch(removeStartCoupon());
    try {
        const response = await axios.delete(baseURL + "coupon/" + id);
        dispatch(removetoCoupon(response.id))
    } catch (error) {
        dispatch(removeInvCoupon(error.message))
    }
}

export const updateCoupon = (data) => async (dispatch) => {
    dispatch(updateStartCoupon());
    try {
        const response = await axios.put(baseURL + "coupon/" + data.id, data);
        dispatch(updatetoCoupon(response.data));
    } catch (error) {
        dispatch(updateInvCoupon(error.message))
    }
}
 

export default couponSlice.reducer



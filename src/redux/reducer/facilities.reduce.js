import { ADD_FCILITIES } from "../ActionTypes";

const initialState = {
    isLoading : false,
    facilities: [],
    error: null
}

export const facilitiesReducer = (state=initialState, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_FCILITIES:
          return {
                ...state,
                facilities : state.facilities.concat(action.payload)
          }  

        default:
            return state
    }
}


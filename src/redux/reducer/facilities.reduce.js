import { ADD_FCILITIES, DELETE_FCILITIES, UPDATE_FCILITIES } from "../ActionTypes";

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

          case DELETE_FCILITIES:
          return {
                ...state,
                facilities : state.facilities.filter((v) => v.id !== action.payload)
          }  

          case UPDATE_FCILITIES:
          return {
                ...state,
                facilities : state.facilities.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
          }  

        default:
            return state
    }
}


import { ADD_FCILITIES } from "../ActionTypes"

export const Addfacilities = (data) => (dispatch) => {
    dispatch({type:ADD_FCILITIES, payload:data})
}
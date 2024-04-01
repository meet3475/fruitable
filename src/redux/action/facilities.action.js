import { ADD_FCILITIES, DELETE_FCILITIES, UPDATE_FCILITIES } from "../ActionTypes"

export const Addfacilities = (data) => (dispatch) => {
    dispatch({type:ADD_FCILITIES, payload:data})
}

export const Deletefacilities = (id) => (dispatch) => {
    dispatch({type:DELETE_FCILITIES, payload:id})
}

export const Updatefacilities = (data) => (dispatch) => {
    dispatch({type:UPDATE_FCILITIES, payload:data})
}
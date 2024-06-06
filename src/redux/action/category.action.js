
export const getData = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/categories/list-categories");
        const data = await response.json();
        console.log(data);
        setData(data.data);
    } catch (error) {
        console.log(error);
    }
    // const localData = JSON.parse(localStorage.getItem("category"));

    // if (localData) {
    //     setData(localData)
    // }
}

export const getProduct = () => async (dispatch) => {
    try {
        dispatch(handleLoading()) 
        await axios.get(baseURL + "product")
            .then((response) => {
                
                setTimeout(() => {
                    dispatch({ type: GET_PRODUCT, payload: response.data })
                }, 2000)

            })
            .catch((error) => {
                dispatch(handleError(error.message))
            })
    } catch (error) {
        dispatch(handleError(error.message))
    }
}
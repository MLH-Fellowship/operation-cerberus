import {
    CHART_PIN_REQUEST,
    CHART_PIN_SUCCESS,
    CHART_PIN_FAILURE
} from "../types/types";

export const pinChart = (fileData, title) => {
    return async (dispatch) => {
        try {
            // initiate request
            dispatch({
                type: CHART_PIN_REQUEST
            })

            // fulfill request
            dispatch({
                type: CHART_PIN_SUCCESS,
                payload: {...fileData, title: title}
            })
        } catch(err) {
            dispatch({
                type: CHART_PIN_FAILURE,
                payload: err
            })
        }
    }
}
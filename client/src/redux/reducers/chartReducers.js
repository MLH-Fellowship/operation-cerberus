import {
    CHART_PIN_REQUEST,
    CHART_PIN_SUCCESS,
    CHART_PIN_FAILURE
} from "../types/types";

export const pinChartReducer = (state = {}, action) => {
    switch(action.type) {
        case CHART_PIN_REQUEST:
            return {loading: true};
        case CHART_PIN_SUCCESS:
            return {loading: false, success: true, chartDetails: action.payload};
        case CHART_PIN_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}
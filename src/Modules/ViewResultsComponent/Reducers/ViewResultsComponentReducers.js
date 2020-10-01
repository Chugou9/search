import { ActionTypes } from "../Consts";
import { PENDING, FULFILLED, REJECTED } from "../../../Common/Consts/Statuses";
import {EPromiseStatus} from 'Common/Enums/Statuses';

export const ViewResultsComponentInitialState = {
    get state() {
        return {
            asyncImages: {
                status: 0,
                data: null,
                error: null
            }
        }
    }
};

export const ViewResultsComponentReducer = (
    initialState = ViewResultsComponentInitialState.state,
    action
) => ({
    asyncImages: ((
        initialState,
        action
    ) => {
        let newState = {...initialState.asyncImages};

        switch(action.type) {
            case `${ActionTypes.GET_IMAGES}${PENDING}`:
                newState = {
                    status: EPromiseStatus.PENDING,
                    data: null,
                    error: null
                };
                break; 
            case `${ActionTypes.GET_IMAGES}${FULFILLED}`:
                newState = {
                    status: EPromiseStatus.FULFILLED,
                    data: action.payload,
                    error: null
                };
                break; 
            case `${ActionTypes.GET_IMAGES}${REJECTED}`:
                newState = {
                    status: EPromiseStatus.REJECTED,
                    data: null,
                    error: action.payload
                };
                break;
        }
        
        return newState;
    })(initialState, action)
});
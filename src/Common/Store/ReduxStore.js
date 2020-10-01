import {ViewResultsComponentInitialState, ViewResultsComponentReducer} from "../../Modules/ViewResultsComponent/Reducers/ViewResultsComponentReducers";
import {combineReducers, createStore} from "redux";

const getInitialState = () => ({
    ViewResultsState: ViewResultsComponentInitialState.state
});

const reducersMap = {
    ViewResultsState: ViewResultsComponentReducer
};

export function configureStore() {
    return createStore(
        combineReducers(reducersMap),
        getInitialState()
    );
}
import {createSlice, isPending} from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../config";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'people',
    initialState: {
        people: [],
        error: null,
        openSuccess: false,
        openError: false,
        isPending: false,
    },
    reducers: {
        getAllPeopleSuccess: (state, action) => {
            state.people = action.payload;
            state.error = null;
        },
        addPersonSuccess: (state, action) => {
            state.people.push(action.payload);
            state.error = null;
            state.openSuccess = true;
            state.isPending = false;
        },
        addPersonFailure: (state, action) => {
            state.error = action.payload;
            state.openError = true;
            state.isPending = false;
        },
        onCloseSuccess: (state, action) => {
            state.openSuccess = false;
        },
        onCloseError: (state, action) => {
            state.openError = false;
        },
        addPersonPending: (state, action) => {
            state.isPending = action.payload;
            state.error = null;
        },
    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getAllPeopleSuccess, addPersonSuccess, addPersonFailure, onCloseSuccess, onCloseError, addPersonPending } = slice.actions;

export const getAllPeopleR = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/people`);
        dispatch(getAllPeopleSuccess(res.data));
    } catch (err) {
    }
}

export const addPersonR = (data, setFullName) => async dispatch => {
    try {
        dispatch(addPersonPending(true))
        const res = await axios.post(`${config.url}/api/people`, data);
        setFullName('');
        dispatch(addPersonSuccess(res.data));
    } catch (err) {
        dispatch(addPersonFailure(err.response.data.error));
    }
}
export const closeSuccess = () => async dispatch => {
    dispatch(onCloseSuccess());
}

export const closeError = () => async dispatch => {
    dispatch(onCloseError());
}



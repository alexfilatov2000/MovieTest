import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../config";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'people',
    initialState: {
        people: [],
        error: null
    },
    reducers: {
        getAllPeopleSuccess: (state, action) => {
            state.people = action.payload;
            state.error = null;
        },
        addPersonSuccess: (state, action) => {
            state.people.push(action.payload);
            state.error = null;
        },
        addPersonFailure: (state, action) => {
            state.error = action.payload;
        },
    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getAllPeopleSuccess, addPersonSuccess, addPersonFailure } = slice.actions;

export const getAllPeopleR = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/people`);
        dispatch(getAllPeopleSuccess(res.data));
    } catch (err) {
    }
}

export const addPersonR = (data, history, setOpen) => async dispatch => {
    try {
        const res = await axios.post(`${config.url}/api/people`, data);
        dispatch(addPersonSuccess(res.data));
        history.replace('/');
    } catch (err) {
        setOpen(true)
        dispatch(addPersonFailure(err.response.data.error));
    }
}


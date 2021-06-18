import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../config";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        specMovie: null,
        error: null
    },
    reducers: {
        getAllMoviesSuccess: (state, action) => {
            state.movies = action.payload;
            state.error = null;
            state.specMovie = null;
        },
        getSpecMovieSuccess: (state, action) => {
            state.specMovie = action.payload;
            state.error = null;
        },
        addMovieSuccess: (state, action) => {
            state.error = null;
        },
        addMovieFailure: (state, action) => {
            state.error = action.payload;
        },
        getAllMoviesByOptionSuccess: (state, action) => {
            state.movies = action.payload;
            state.error = null;
        },

    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getAllMoviesSuccess, getSpecMovieSuccess, addMovieSuccess, addMovieFailure, getAllMoviesByOptionSuccess } = slice.actions;

export const getAllMoviesR = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/movies`);
        dispatch(getAllMoviesSuccess(res.data));
    } catch (err) {
    }
}

export const getSpecMovieR = (id) => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/movies/${id}`);
        dispatch(getSpecMovieSuccess(res.data));
    } catch (err) {
        console.log(err)
    }
}

export const addMovieR = (data, history, setOpen) => async dispatch => {
    try {
        const res = await axios.post(`${config.url}/api/movies`, data);
        dispatch(addMovieSuccess(res.data));
        history.replace('/');
    } catch (err) {
        setOpen(true);
        dispatch(addMovieFailure(err.response.data.error));
    }
}

export const deleteMovieR = (id, history) => async dispatch => {
    try {
        await axios.delete(`${config.url}/api/movies/${id}`);
        history.replace('/');
    } catch (err) {
    }
}

export const getAllMoviesByOptionR = (value, type) => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/movies?${type}=${value}`);
        dispatch(getAllMoviesSuccess(res.data));
    } catch (err) {
    }
}


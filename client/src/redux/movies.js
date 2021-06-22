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
        error: null,
        openDialog: false,
        isPending: false
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
            state.isPending = false;
        },
        addMovieFailure: (state, action) => {
            state.error = action.payload;
            state.isPending = false;
        },
        getAllMoviesByOptionSuccess: (state, action) => {
            state.movies = action.payload;
            state.error = null;
        },
        dialogOpenSuccess: (state, action) => {
            state.openDialog = true;
            state.error = null;
        },
        dialogCloseSuccess: (state, action) => {
            state.openDialog = false;
            state.error = null;
        },
        saveTxtFailure: (state, action) => {
            state.error = action.payload;
            state.isPending = false;
        },
        saveTxtSuccess: (state, action) => {
            state.openDialog = false;
            state.error = null;
            state.isPending = false;
        },
        addMoviePending: (state, action) => {
            state.isPending = action.payload;
            state.error = null;
        },
    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getAllMoviesSuccess, getSpecMovieSuccess, addMovieSuccess, addMovieFailure,
    getAllMoviesByOptionSuccess, dialogOpenSuccess,
    dialogCloseSuccess, saveTxtFailure, saveTxtSuccess, addMoviePending } = slice.actions;

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
        dispatch(addMoviePending(true));
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
        dispatch(getAllMoviesByOptionSuccess(res.data));
    } catch (err) {
    }
}

export const dialogOpen = () => async dispatch => {
    dispatch(dialogOpenSuccess())
}

export const dialogClose = () => async dispatch => {
    dispatch(dialogCloseSuccess())
}

export const saveTxt = (img) => async dispatch => {
    try {
        dispatch(addMoviePending(true));
        const res = await axios.post(`${config.url}/api/movies/txt`, img);
        dispatch(saveTxtSuccess(res.data));
    } catch (err) {
        dispatch(saveTxtFailure(err.response.data));
    }
}


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
        isPending: false,
        openSuccess: false,
        openError: false,
        openDeleteDialog: false
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
            state.openSuccess = true;
        },
        addMovieFailure: (state, action) => {
            state.error = action.payload;
            state.isPending = false;
            state.openError = true;
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
            state.movies.push(...action.payload);
            state.openDialog = false;
            state.error = null;
            state.isPending = false;
        },
        addMoviePending: (state, action) => {
            state.isPending = action.payload;
            state.error = null;
        },
        onCloseSuccess: (state, action) => {
            state.openSuccess = false;
        },
        onCloseError: (state, action) => {
            state.openError = false;
        },
        setOpenDialogSuccess: (state, action) => {
            state.openDeleteDialog = action.payload;
        },
        deleteMovieSuccess: (state, action) => {
            state.openDeleteDialog = false;
        },
    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getAllMoviesSuccess, getSpecMovieSuccess, addMovieSuccess, addMovieFailure,
    getAllMoviesByOptionSuccess, dialogOpenSuccess,
    dialogCloseSuccess, saveTxtFailure, saveTxtSuccess,
    addMoviePending, onCloseSuccess, onCloseError, setOpenDialogSuccess, deleteMovieSuccess } = slice.actions;

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

export const addMovieR = (data, setTitle, setYear) => async dispatch => {
    try {
        dispatch(addMoviePending(true));
        const res = await axios.post(`${config.url}/api/movies`, data);
        setTitle('');
        setYear('')
        dispatch(addMovieSuccess(res.data));
    } catch (err) {
        dispatch(addMovieFailure(err.response.data.error));
    }
}

export const deleteMovieR = (id, history) => async dispatch => {
    try {
        await axios.delete(`${config.url}/api/movies/${id}`);
        dispatch(deleteMovieSuccess())
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
        dispatch(saveTxtFailure(err.response.data.error));
    }
}

export const closeSuccess = () => async dispatch => {
    dispatch(onCloseSuccess());
}

export const closeError = () => async dispatch => {
    dispatch(onCloseError());
}

export const setOpenDialog = (val) => async dispatch => {
    dispatch(setOpenDialogSuccess(val));
}


import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {deleteMovieR, setOpenDialog} from "../redux/movies";

export default function AlertDialog({id, history}) {
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movies);

    const handleClose = () => {
        dispatch(setOpenDialog(false));
    };

    const deleteMovie = (e) => {
        e.preventDefault();
        dispatch(deleteMovieR(id, history))
    }

    return (
        <div>
            <Dialog
                open={movie.openDeleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure that you want to delete movie?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteMovie} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
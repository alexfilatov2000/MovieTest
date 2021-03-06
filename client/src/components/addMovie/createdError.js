import {makeStyles, Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {closeError} from "../../redux/movies";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    snackbar: {
        position: "fixed",
        left: 'calc(50% + 120px)',
    },
    alert: {
        fontSize: 30
    }
}));

const CreatedError = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movies);

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeError());
    };

    return (
        <div>
            <Snackbar
                open={movie.openError}
                autoHideDuration={10000}
                onClose={handleCloseError}
                className={classes.snackbar}
            >
                <Alert onClose={handleCloseError} severity="error" className={classes.alert}>
                    {movie.error}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CreatedError
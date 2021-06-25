import {makeStyles, Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {closeError} from "../../redux/people";
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
    const person = useSelector(state => state.people);

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeError());
    };

    return (
        <div>
            <Snackbar
                open={person.openError}
                autoHideDuration={10000}
                onClose={handleCloseError}
                className={classes.snackbar}
            >
                <Alert onClose={handleCloseError} severity="error" className={classes.alert}>
                    {person.error}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CreatedError
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Typography, Container, TextField, Button, makeStyles, Snackbar} from "@material-ui/core";
import {useState} from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {addPersonR} from "../redux/people";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: 25,
    },
    inputs: {
        paddingBottom: 20
    },
    title: {
        margin: '20px 0'
    },
    snackbar: {
        position: "fixed",
        left: 'calc(50% + 120px)',
    },
    alert: {
        fontSize: 30
    },
}));

const AddPerson = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const person = useSelector(state => state.people);

    const [full_name, setFullName] = useState('');
    const [open, setOpen] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPersonR({ full_name }, history, setOpen))
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" className={classes.title}>
                Add a Character
            </Typography>

            {person.error &&
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={10000}
                    onClose={handleClose}
                    className={classes.snackbar}
                >
                    <Alert onClose={handleClose} severity="error" className={classes.alert}>
                        {person.error}
                    </Alert>
                </Snackbar>
            </div>
            }

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    className={classes.inputs}
                    onChange={(e) => setFullName(e.target.value)}
                    label="Full_Name"
                    name="full_name"
                    variant="outlined"
                    value={full_name}
                    required
                    fullWidth
                />

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"

                >
                    Add Character
                </Button>
            </form>

        </Container>
    );
}

export default AddPerson
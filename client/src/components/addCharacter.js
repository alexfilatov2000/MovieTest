import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Typography, Container, TextField, Button, makeStyles} from "@material-ui/core";
import {useState} from "react";
import {addPersonR} from "../redux/people";
import CreatedError from "./addCharacter/createdError";
import CreatedSuccess from "./addCharacter/createdSuccess";

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
    button: {
        marginLeft: 30
    }
}));

const AddPerson = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const person = useSelector(state => state.people);

    const [full_name, setFullName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPersonR({ full_name }, setFullName))
    }
    if (person.isPending) return (<div>Wait please...</div>);
    else return (
        <Container>
            <Typography variant="h4" className={classes.title}>
                Add a Character
            </Typography>

            {person.error && <CreatedError />}
            {person.openSuccess && <CreatedSuccess />}

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

                <Button
                    className={classes.button}
                    type="submit"
                    color="default"
                    variant="contained"
                    onClick={() => history.replace("/")}
                >
                    Cancel
                </Button>
            </form>

        </Container>
    );
}

export default AddPerson
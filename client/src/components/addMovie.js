import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Typography, Container, TextField, Button, makeStyles, Select, MenuItem} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Autocomplete} from "@material-ui/lab";
import {getAllPeopleR} from "../redux/people";
import {addMovieR} from "../redux/movies";
import CreatedError from "./addMovie/createdError";
import CreatedSuccess from "./addMovie/createdSuccess";

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
        marginTop: 20,
        marginRight: 40
    },
    required: {
        color: "red"
    }
}));

const AddMovie = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const movie = useSelector(state => state.movies);
    const person = useSelector(state => state.people);

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('DVD');
    const [people, setPeople] = useState([]);
    const [myFile, setMyFile] = useState(null);

    useEffect(() => {
        dispatch(getAllPeopleR())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const peopleData = people.map(p => p.full_name);
        const data = new FormData();
        data.append('upload', myFile);
        data.append('title', title);
        data.append('type', type);
        data.append('year', year);
        for (let i = 0; i < peopleData.length; i++) {
            data.append('people[]', peopleData[i]);
        }
        dispatch(addMovieR(data, setTitle, setYear))
    }

    if (movie.isPending) return (<div>Wait please...</div>);
    else return (
        <Container>
            <Typography variant="h4" className={classes.title}>
                Add a Movie
            </Typography>

            {movie.error && <CreatedError />}
            {movie.openSuccess && <CreatedSuccess />}

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    className={classes.inputs}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    name="title"
                    variant="outlined"
                    value={title}
                    required
                    fullWidth
                />

                <TextField
                    className={classes.inputs}
                    label="Year"
                    variant="outlined"
                    required
                    fullWidth
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                <Autocomplete
                    value={people}
                    className={classes.inputs}
                    multiple
                    onChange={(e, value) => setPeople(value)}
                    id="tags-standard"
                    options={person.people}
                    getOptionLabel={(option) => option.full_name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="People"
                            name="People"
                            fullWidth
                            required
                        />
                    )}
                />

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    variant="filled"
                    fullWidth
                    required
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value={'DVD'}>DVD</MenuItem>
                    <MenuItem value={'VHS'}>VHS</MenuItem>
                    <MenuItem value={'Blu-Ray'}>Blu-Ray</MenuItem>
                </Select>
                <div className={classes.required}>Choose one from the list*</div>

                <TextField
                    className={classes.button}
                    variant="outlined"
                    type="file"
                    id="upload"
                    name="upload"
                    onChange={(e) => setMyFile(e.target.files[0])}
                    required
                    fullWidth
                />
                <div className={classes.required}>Available only: jpg, jpeg, png formats*</div>

                <Button
                    className={classes.button}
                    type="submit"
                    color="secondary"
                    variant="contained"

                >
                    Add Movie
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

export default AddMovie
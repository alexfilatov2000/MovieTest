import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllMoviesByOptionR, getAllMoviesR} from "../redux/movies";
import {
    Box,
    Button,
    CardActionArea,
    CardContent,
    CardMedia, FormControl, FormControlLabel, FormLabel,
    Grid,
    makeStyles,
    Radio, RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import {config} from "../config";
import { useHistory } from "react-router-dom";
import Home from "./Home";

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: "center",
        margin: '20px 0 40px 0'
    },
    boxes: {
        margin: 20
    },
    box: {
        margin: 20
    },
    media: {
        height: 400,
    },
    root: {
        margin: 20
    },
    data: {
        textAlign: "center"
    },
    inpAndButt: {
        display: "block",
        padding: "15px 0"
    },
    input: {
        verticalAlign: "middle",
        paddingRight: 10
    },
    form: {
        border: "1px solid black",
        margin: 10,
        padding: 10,
        flex: 1
    }
}));

const GetAllMovies = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movies);

    const [value, setValue] = useState('');
    const [type, setType] = useState('title');
    const [sort, setSort] = useState('ASC');


    useEffect(() => {
        dispatch(getAllMoviesR());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getAllMoviesByOptionR(value, type))
    }

    const sortSubmit = (e) => {
        e.preventDefault();
        dispatch(getAllMoviesR(sort))
    }

    return (
        <div className={classes.root}>
            <Home/>

            <Box display="flex">
                <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Options</FormLabel>
                        <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
                            <FormControlLabel value="title" control={<Radio />} label="Search By Title" />
                            <FormControlLabel value="full_name" control={<Radio />} label="Search By Character Name" />
                        </RadioGroup>
                    </FormControl>

                    <Box className={classes.inpAndButt}>
                        <TextField
                            className={classes.input}
                            onChange={(e) => setValue(e.target.value)}
                            label="Value"
                            name="val"
                            variant="outlined"
                            value={value}
                            required
                        />

                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"

                        >
                            Search
                        </Button>
                    </Box>
                </form>

                <form noValidate autoComplete="off" onSubmit={sortSubmit} className={classes.form}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Sort</FormLabel>
                        <RadioGroup value={sort} onChange={(e) => setSort(e.target.value)}>
                            <FormControlLabel value="ASC" control={<Radio />} label="Sort alphabetically" />
                            <FormControlLabel value="DESC" control={<Radio />} label="Sort descending" />
                        </RadioGroup>
                    </FormControl>
                    <br/>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                    >
                        Sort
                    </Button>
                </form>

            </Box>


            {movie.error &&
                <div>
                    <Typography variant="h4" className={classes.header}>
                        {movie.error}
                    </Typography>
                </div>
            }

            {!movie.error &&
                <div>
                    <Grid container spacing={2}>
                        {movie.movies.map(item => (
                            <Grid item xs={2} key={item.id}>
                                <CardActionArea onClick={() => history.push(`movies/${item.id}`)}>
                                    <CardMedia
                                        className={classes.media}
                                        image={config.url+"/"+item.picture}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.data}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.title}
                                        </Typography>

                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Release Date - {item.year}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            }
        </div>
    );
}

export default GetAllMovies;
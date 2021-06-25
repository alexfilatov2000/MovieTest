import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSpecMovieR, setOpenDialog} from "../redux/movies";
import {
    Avatar,
    Box,
    Button,
    makeStyles,
    Typography
} from "@material-ui/core";
import {config} from "../config";
import { useHistory, useParams} from "react-router-dom";
import AlertDialog from "./dialog";

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: "center",
        margin: '20px 0 40px 0'
    },
    root: {
        margin: 20
    },
    image: {
        width: theme.spacing(60),
        height: theme.spacing(60),
        display: "block",
        margin: "0 auto"
    },
    data: {
        textAlign: "center"
    },
    peoplePlace: {
        flex: 1,
        justifyContent: "center"
    },
    peopleArr: {
        marginRight: 10,
        fontSize: 14,
        height: 25,
        textTransform: "lowercase",
        color: "#39739d",
        backgroundColor: "#e1ecf4",
        '&:hover': {
            backgroundColor: "#d1e5f1",
            color: "#2c5777",
        },
    },
}));

const GetSpecMovie = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movies);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSpecMovieR(id));
    }, []);


    const handleClickOpen = () => {
        dispatch(setOpenDialog(true))
    };

    return (
        <div className={classes.root}>
            {movie.specMovie &&
                <div>
                    <Typography variant="h3" className={classes.header}>
                        {movie.specMovie.title}
                    </Typography>

                    <Box className={classes.data}>
                        <Avatar className={classes.image} variant="rounded" alt="img" src={`${config.url}/${movie.specMovie.picture}`} />

                        <Typography variant="body1" color="textSecondary">
                            Cast:
                        </Typography>

                        <Box className={classes.peoplePlace} display="flex">
                            {movie.specMovie.people.map(p => (
                                <Button
                                    className={classes.peopleArr}
                                    type="submit"
                                    variant="contained"
                                    key={p.id}
                                >
                                    {p.full_name}
                                </Button>
                            ))}
                        </Box>

                        <Typography variant="body1" color="textSecondary">
                            Release Date - {movie.specMovie.year}
                        </Typography>

                        <Typography variant="body1" color="textSecondary">
                            Format - {movie.specMovie.type}
                        </Typography>

                        <Button
                            onClick={handleClickOpen}
                            type="submit"
                            color="secondary"
                            variant="contained"

                        >
                            delete
                        </Button>
                        <AlertDialog id={id} history={history}/>
                    </Box>
                </div>
            }
        </div>
    );
}

export default GetSpecMovie;
import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dialogClose, dialogOpen, saveTxt} from "../redux/movies";

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: "center",
        margin: 20
    },
    boxes: {
        margin: 20
    },
    box: {
        margin: 20
    },
    error: {
        color: "red",
        fontWeight: "bold",
        border: "1px solid red",
        borderRadius: 5,
        padding: 5,
        marginBottom: 5
    }
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movies);
    const [myFile, setMyFile] = useState(null);

    const handleClickOpen = () => {
        dispatch(dialogOpen());
    };

    const handleClose = () => {
        dispatch(dialogClose());
    };

    const editPic = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('upload', myFile);

        dispatch(saveTxt(data));
    }

    return (
        <div>
            <Typography variant="h3" className={classes.header}>
                Welcome To Movie Application
            </Typography>

            <Box display="flex" className={classes.boxes}>

                <Button
                    className={classes.box}
                    onClick={() => history.push('/addMovie')}
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    Add Movie
                </Button>

                <Button
                    className={classes.box}
                    onClick={handleClickOpen}
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    Add Movie From File
                </Button>

                <Button
                    className={classes.box}
                    onClick={() => history.push('/addCharacter')}
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    Add Movie Character
                </Button>
            </Box>

            <Dialog open={movie.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Movies</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select *.txt file
                    </DialogContentText>
                    <input
                        type="file"
                        id="upload"
                        name="upload"
                        onChange={(e) => setMyFile(e.target.files[0])}
                        required
                    />

                    {movie.error && <div className={classes.error}>Something Wrong With Your File</div>}
                    {movie.isPending && <div className={classes.error}>Waite please...</div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={editPic} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default Home;
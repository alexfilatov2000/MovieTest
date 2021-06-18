import {Box, Button, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

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
    }
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory();

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
                    onClick={() => history.push('/addCharacter')}
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    Add Movie Character
                </Button>
            </Box>

        </div>
    );
}

export default Home;
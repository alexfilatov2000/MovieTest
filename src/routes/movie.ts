import Router from 'koa-router';
import MovieController from '../controllers/movie';
import { upload } from '../middleware/multerOptions';
import { txtUpload } from '../middleware/multerTxt';

const movieRouter = new Router();

movieRouter.get('/api/movies', MovieController.getAllMovies);
movieRouter.get('/api/movies/:id', MovieController.getSpecMovie);
movieRouter.post('/api/movies', upload.single('upload'), MovieController.addMovie);
movieRouter.post('/api/movies/txt', txtUpload.single('upload'), MovieController.addMovieFromFile);
movieRouter.delete('/api/movies/:id', MovieController.deleteMovie);

export default movieRouter.routes();

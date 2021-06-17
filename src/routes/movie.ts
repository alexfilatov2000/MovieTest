import Router from 'koa-router';
import MovieController from '../controllers/movie';
const movieRouter = new Router();

movieRouter.get('/api/movies', MovieController.getAllMovies);
movieRouter.get('/api/movies/:id', MovieController.getSpecMovie);
movieRouter.post('/api/movies', MovieController.addMovie);
movieRouter.delete('/api/movies/:id', MovieController.deleteMovie);

export default movieRouter.routes();

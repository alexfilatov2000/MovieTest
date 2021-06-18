import Router from 'koa-router';
import PeopleController from '../controllers/people';
const peopleRouter = new Router();

peopleRouter.post('/api/people', PeopleController.addPerson);
peopleRouter.get('/api/people', PeopleController.getAllPeople);

export default peopleRouter.routes();

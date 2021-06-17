import Router from 'koa-router';
import movie from './movie';
import people from './people';

const router = new Router();
const allRouters: any = new Router();

allRouters.use(movie);
allRouters.use(people);

router.use(allRouters.routes());
export default router;

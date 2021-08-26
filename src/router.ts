import KoaRouter from '@koa/router'
import { health } from './db';
import { checkLoggedIn } from './lib/checkLoggedIn';
import { getMovies, getScreen, getSeat, ticketing, preferSeat, login, ticketInfo } from './service';

const router = new KoaRouter()

const VERSION = '/v1';

router.get('/', (ctx) => {
  console.log('[GET] /');
  ctx.body = {
    mycroft: 'rocket',
  }
})

router.get(`/${VERSION}/health/db`, async(ctx)=>{
  ctx.body = await health.sqlite();
})

// 전체 영화 리스트 조회
router.get(`${VERSION}/movie`, checkLoggedIn, getMovies);
router.get(`${VERSION}/screen`, checkLoggedIn, getScreen);
router.get(`${VERSION}/seat`, checkLoggedIn, getSeat);
router.post(`${VERSION}/prefer-seat`, checkLoggedIn, preferSeat);
router.post(`${VERSION}/ticketing`,checkLoggedIn, ticketing);
router.post(`${VERSION}/login`, login);
router.get(`${VERSION}/ticket-info`, checkLoggedIn, ticketInfo);



export default router

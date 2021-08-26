import KoaRouter from '@koa/router'
import { checkLoggedIn } from './lib/checkLoggedIn'
import { getMovies, getScreen, getSeat, ticketing, preferSeat, login, ticketInfo } from './service'

const router = new KoaRouter()

const VERSION = '/v1';

// router.get('/', (ctx) => {
//   console.log('[GET] /');
//   ctx.body = {
//     mycroft: 'rocket',
//   }
// })


console.log('dir', __dirname);

// router.get(`${VERSION}/api-docs`, KoaStatic('dist/app.js'));

// router.get(`${VERSION}/api-docs`, ctx=>{
//   console.log('############')
//   return KoaStatic(absolutePath());
// });

// 전체 영화 리스트 조회
router.get(`${VERSION}/movie`, checkLoggedIn, getMovies);
// 영화별 상영관 조회
router.get(`${VERSION}/screen`, checkLoggedIn, getScreen);
router.get(`${VERSION}/seat`, checkLoggedIn, getSeat);
router.post(`${VERSION}/prefer-seat`, checkLoggedIn, preferSeat);
router.post(`${VERSION}/ticketing`,checkLoggedIn, ticketing);
router.post(`${VERSION}/login`, login);
router.get(`${VERSION}/ticket-info`, checkLoggedIn, ticketInfo);



export default router

import KoaRouter from '@koa/router'
import { checkLoggedIn } from './lib/checkLoggedIn'
import { getMovies, getScreen, getSeat, ticketing, preferSeat, login, ticketInfo } from './service'

const router = new KoaRouter()

const VERSION = '/v1';


// 전체 영화 리스트 조회
router.get(`${VERSION}/movie`, checkLoggedIn, getMovies);
// 영화별 상영관 조회
router.get(`${VERSION}/screen`, checkLoggedIn, getScreen);
// 상영관 좌석 정보 조회
router.get(`${VERSION}/seat`, checkLoggedIn, getSeat);
// 선호하는 좌석 중 예매 가능 좌석 조회
router.post(`${VERSION}/prefer-seat`, checkLoggedIn, preferSeat);
router.post(`${VERSION}/ticketing`,checkLoggedIn, ticketing);
router.post(`${VERSION}/login`, login);
router.get(`${VERSION}/ticket-info`, checkLoggedIn, ticketInfo);


export default router

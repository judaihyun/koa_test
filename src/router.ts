import KoaRouter from '@koa/router'
import { health } from './db';

const router = new KoaRouter()

router.get('/', (ctx) => {
  console.log('[GET] /');
  ctx.body = {
    mycroft: 'rocket',
  }
})

router.get('/health/db', async(ctx)=>{
  ctx.body = await health.sqlite();
})

export default router

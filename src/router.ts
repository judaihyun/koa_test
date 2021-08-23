import KoaRouter from '@koa/router'

const router = new KoaRouter()

router.get('/', (ctx) => {
  ctx.body = {
    mycroft: 'rocket',
  }
})

export default router

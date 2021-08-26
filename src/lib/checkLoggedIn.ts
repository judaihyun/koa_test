
export const checkLoggedIn = (ctx:any, next: () => void) => {
    console.log('checkLoggedIn')
      if(!ctx.request.user){
          ctx.response.status = 403;
          ctx.body = 'Unauthorized';
          return;
      }
      if (!ctx.request.user) {
          ctx.response.status = 403;
          ctx.body = 'Unauthorized';
          return;
      }
      return next();
  };
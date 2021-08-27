
export const checkLoggedIn = (ctx:any, next: () => void) => {
    console.log('checkLoggedIn')
      if(!ctx.request.user){
          ctx.response.status = 401;
          ctx.body = 'Unauthorized';
          return;
      }
      if (!ctx.request.user) {
          ctx.response.status = 401;
          ctx.body = 'Unauthorized';
          return;
      }
      return next();
  };
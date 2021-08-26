import { context } from 'koa';
import logger from '../../logger';
import { verifyToken } from './jwt';


export const jwtMiddleware = async (ctx:context, next:context) => {
    logger.info('-------jwtMiddleware---------');

    const token = ctx.cookies.get('access_token');
    if(!token){
        return next();
    }

    try{
        const decoded = await verifyToken(token);
        if(!decoded) return next();
        console.log('jwtMiddleware - decode', decoded);
        ctx.request.user = decoded;
    }catch(e){
        logger.error(e);
        ctx.request.user = null;
    }

    return next();
}




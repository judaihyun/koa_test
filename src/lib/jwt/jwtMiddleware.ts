import logger from '../../logger';
import { verifyToken } from './jwt';


export const jwtMiddleware = async (ctx:any, next:any) => {
    logger.info('-------jwtMiddleware---------');
    const token = ctx.cookies.get('access_token');
    logger.info('token ', token) 
    if(!token){
        ctx.response.status = 403;
        ctx.body = 'Unauthorized';
        return;
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




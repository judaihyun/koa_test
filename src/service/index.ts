import Models from '../db/models';
import logger from '../logger';
import { context } from 'koa';
import { Op, QueryTypes } from 'sequelize';
import { isValid } from '../utils/isValid';
import { generateToken } from '../lib/jwt/jwt';

/*
    query결과에 데이터에 대한 raw, plain 설명
    https://juhi.tistory.com/13
*/


export const login = async (ctx:context) => {
    logger.info('[POST]--------login---------')

    const { id, password } = ctx.request.body;
    try{
        const user = await Models.user.findOne({
            raw:true,
            where: {
                id:{
                    [Op.eq]: id
                }
            }
        })
        console.log('user : ',user);
        if(!user){
            ctx.response.status = 400;
            // ctx.body = 'user not exists';
            return;
        }

        if(!isValid.password(user.password, password)){
            ctx.response.status = 401;
            // ctx.body = 'password incorrect';
            return;
        }

        const token = await generateToken(user);
        ctx.cookies.set('access_token', token, { 
            maxAge: 1000 * 60 * 60 * 24 * 4,
        })

        console.log(token);
        ctx.body = 'login success';

    }catch(e){
        logger.error(e);
    }
    logger.info('[POST-end]--------login---------')
}

export const getMovies = async (ctx:context) => {
    logger.info('[GET]--------getMovies---------')

    //TODO login check

    try{
        const allMovie = await Models.movie.findAll({raw: true});
        console.log(allMovie);
        if(!allMovie.length) {
            ctx.response.status = 204;
            ctx.body = 'no contents';
            return;
        }
        
        ctx.body = allMovie;
    }catch(e){
        logger.error(e);
    }finally{
        logger.info('[GET-end]------getMovies-------')
        return;
    }
}


export const getScreen = async (ctx:context) => {
    logger.info('[GET]--------getScreen---------')

    //TODO login check

    const raw = 
    `select s.screen_no, movie_no, m.title, t.theater_name 
    from screen s, movie m, theater t 
    where m.no = s.movie_no 
    and s.theater_no = t.no 
    group by movie_no, theater_no`;

    try{
        const allScreen = await Models.sequelize.query(raw,{
            type:QueryTypes.SELECT
        });
        console.log(allScreen); 
        ctx.body = allScreen;
    }catch(e){
        logger.error(e);
    }finally{
        logger.info('[GET-end]------getScreen-------')
        return;
    }

}


export const getSeat = async (ctx:context) => {
    logger.info('[GET]--------getSeat---------');

    //TODO login check

    const raw = 
    `select sc.theater_name, sc.screen_no, seat_name, price, se.is_book
    from seat se, screen sc 
    where sc.screen_no = se.screen_no and sc.screen_no = :screen_no`;

    try{

        const { screen } = ctx.request.query;
        console.log(screen);
        const seat = await Models.sequelize.query(raw,{
            type:QueryTypes.SELECT,
            replacements: { screen_no: screen}
        });
        if(!seat.length) {
            ctx.response.status = 204;
            ctx.body = 'no contents';
            return;
        }
        console.log(seat); 
        ctx.body = seat;
    }catch(e){
        logger.error(e);
    }finally{
        logger.info('[GET-end]------getSeat-------');
        return;
    }

}

export const preferSeat = async(ctx:context) => {
    logger.info('[POST]--------preferSeat---------');

    //TODO login check

    const raw = 
    `select sc.theater_name, sc.screen_no, seat_name, price, 
     se.is_book from seat se, screen sc 
     where sc.screen_no = se.screen_no and sc.screen_no = :screen_no 
     and se.seat_name in (:seat) 
     and se.is_book = 0`;

    try{

        const { prefer_seat } = ctx.request.body;
        const { screen } = ctx.request.query;
        console.log('screen_no: ', screen);
        console.log(prefer_seat);
        
        const seat = await Models.sequelize.query(raw,{
            type:QueryTypes.SELECT,
            replacements: { screen_no: screen, seat: prefer_seat }
        });
        if(!seat.length) {
            ctx.response.status = 204;
            ctx.body = 'no contents';
            return;
        }
        console.log(seat); 
        ctx.body = seat;
        
    }catch(e){
        logger.error(e);
    }finally{
        logger.info('[POST-end]------preferSeat-------');
        return;
    }
}

export const ticketing = async(ctx:context) => {
    logger.info('[POST]--------ticketing---------');

    //TODO login check
    try{

        const { screen, seat, price } = ctx.request.body;
        console.log('screen_no: ', screen, seat, price);
        
        const seatInfo = await Models.seat.findAll({
            raw: true,
            limit:1,
            attributes:['screen_no','seat_name','price','is_book'],
            where:{
                [Op.and]:[
                    {screen_no: screen},
                    {seat_name: seat},
                    // {book_number: null} 409...떄문에..
                ]
            }
        });
        // console.log(seatInfo);
        if(!isValid.ticketing(seatInfo, price)){
            return;
        }

        await Models.seat.update({is_book: 'Y'},{
            where: {
                [Op.and]:[
                    {screen_no: screen},
                    {seat_name: seat}
                ]
            }
        })

        const issued = await Models.ticket.create({
            screen_no: 12,
            user:'testUser',
            complete: false,
        })
        console.log(issued);

        ctx.body = issued;
        
    }catch(e){
        logger.error(e);
        ctx.response.status = e.status;
        ctx.body = e.msg;
    }finally{
        logger.info('[POST-end]------ticketing-------');
        return;
    }
}

export const ticketInfo = async(ctx:context) => {
    logger.info('[GET]------ticket info-------');

    try{
        const { ticket } = ctx.request.query;
        console.log(ticket)
        const ticketInfo = await Models.ticket.findOne({
            raw:true,
            attributes:['ticket_no','screen_no','user','complete','created_at'],
            where: {
                ticket_no: {
                    [Op.eq]: ticket
                }
            }
        })
        console.log(ticketInfo)
        if(!ticketInfo){
            ctx.response.status = 400;
            return;
        }        

        ctx.body = ticketInfo;

    }catch(e){
        logger.error(e);
    }finally{
        logger.info('[GET-end]------ticket info-------');
        return;
    }
}
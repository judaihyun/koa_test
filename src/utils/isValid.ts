
export const isValid = {

    price (toBookingPrice:string, _price:string) {
        return toBookingPrice === _price ? true : false;
    },
    isBook(is_book:string){
        return is_book === 'Y' ? true : false;
    },
    isEmpty(toBooking){
        return toBooking.length === 0 ? true : false;
    },
    password(realPwd:string, targetPwd:string){
        const origin = Buffer.from(realPwd, 'base64').toString();
        return origin === targetPwd ? true : false;
    },
    ticketing (seatInfo:any, userPrice:string){
        if(this.isEmpty(seatInfo)){
            throw { status: 204, msg: 'no contents'}
        }

        const {price, is_book} = seatInfo[0];
        if(!this.price(price, userPrice)){
            throw { status: 422, msg: ''}
        }else if(this.isBook(is_book)){
            throw { status: 409, msg: 'already has been booked'}
        }

        return true;
    }


}
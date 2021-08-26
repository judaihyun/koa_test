import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface payload {
    id: number,
}

export const generateToken = (toSend: payload) => {
    return new Promise((res, rej) => {
        jwt.sign(
            {
                id: toSend.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2d',
            },(err, token)=>{
                if(err) rej(err);
                res(token);
            }
        );
    })
};

export const verifyToken = (token: string) => {
    return new Promise((res,rej) => {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, token) => {
                if(err) rej(err);
                res(token);
        });
    })
};


function callback(err: any, decoded: any) {
    console.error(err);
    if (decoded) {
        return decoded;
    } else if (err) {
        console.log('verifyToken Error');
        return false;
    }
    console.log('verifyToken Error');
    return false;
}
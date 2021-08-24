
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

export const health = {

    async sqlite(){
        try{
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            return { status: 'connected'}
        }catch(error){
            console.error('Unable to connect to the database:', error);
            return { status: 'closed'}
        }
    }

}
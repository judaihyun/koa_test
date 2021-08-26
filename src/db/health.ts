import Models from '../db/models';

export const health = {

    async sqlite(){
        try{
            await Models.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            return { status: 'connected'}
        }catch(error){
            console.error('Unable to connect to the database:', error);
            return { status: 'closed'}
        }finally{
            // Models.sequelize.close();
        }
    }
}
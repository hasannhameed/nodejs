const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('store_db','root','',{
    host:'localhost',
    dialect : 'mysql',
});

async function connectDB(){
    try{
        await sequelize.authenticate();
        console.log('connection success !');
    }catch(error){
        console.log('connection error ', error);
    }
}

connectDB();


module.exports = sequelize
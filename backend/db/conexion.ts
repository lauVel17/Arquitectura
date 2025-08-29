
import { Sequelize } from "sequelize";
const db = new Sequelize('voluntariado', 'lau', '123_Lau*', {
   host: 'localhost',
    dialect: 'mysql',
    define:{
        freezeTableName:true,
        timestamps:false,
        //prueba
    }
   
});

export default db;


import Sequelize from 'sequelize'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './config.js';

/*export const connectDB = async () => {
    try {
      const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT,
      });
  
      console.log('Conectado a la base de datos MySQL');
      return connection;
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1); // Salir del proceso si no se puede conectar
    }
  };*/

  /*const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    connectionLimit: 10, // Permite manejar múltiples conexiones
  });
  
  export const connectDB = async () => {
    try {
      const connection = await pool.getConnection(); // Obtener una conexión
      console.log('Conectado a la base de datos MySQL');
      connection.release(); // Liberar la conexión de prueba
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1); // Salir del proceso si falla la conexión
    }
  };
  
  export default pool;*/

  export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: true, // Puedes poner true si quieres ver las consultas en consola
  });
  
  export const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('Conectado a MySQL con Sequelize');
    } catch (error) {
      console.error('Error al conectar a MySQL:', error);
      process.exit(1);
    }
  };
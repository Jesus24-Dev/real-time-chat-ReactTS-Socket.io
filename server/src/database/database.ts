import { Sequelize } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'database.sqlite'), 
  });

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Conexión a SQLite establecida correctamente.');
    } catch (error) {
      console.error('Error al conectar a SQLite:', error);
    }
}
  
testConnection();
  
export default sequelize;
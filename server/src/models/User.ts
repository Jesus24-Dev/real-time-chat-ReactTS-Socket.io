import { DataTypes, Model, BelongsToManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../database/database';
import UserAttributes from '../types/userType';
import Room from './Room';

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getRooms!: BelongsToManyGetAssociationsMixin<Room>;
  }
  
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: true,
    }
);
  
export default User;
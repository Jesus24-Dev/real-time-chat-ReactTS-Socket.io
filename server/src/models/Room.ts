import { DataTypes, Model, Association } from 'sequelize';
import sequelize from '../database/database';
import RoomAttributes from '../types/roomType';
import User from './User'

class Room extends Model<RoomAttributes> implements RoomAttributes {
    public id!: number;
    public id_admin!: number;
    public roomName!: string;
    public description!: string | null;
    public readonly createdAt!: Date;
    public readonly updateAt!: Date;

    public addUser!: (user: User) => Promise<void>;
    public getUsers!: (options?: any) => Promise<User[]>;
  
    public static associations: {
      users: Association<Room, User>;
    };
}

Room.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'room',
    timestamps: true,
    }
);

export default Room;
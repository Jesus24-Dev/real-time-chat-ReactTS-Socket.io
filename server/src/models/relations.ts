import User from "./User";
import Room from './Room'

Room.belongsToMany(User, { through: 'RoomUser' });
User.belongsToMany(Room, { through: 'RoomUser' });

export {Room, User}
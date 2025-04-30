import User from "./User";
import Room from './Room'
import Contact from "./Contact";

Room.belongsToMany(User, { through: 'RoomUser' });
User.belongsToMany(Room, { through: 'RoomUser' });

User.belongsToMany(User, { through: Contact, foreignKey: 'id_user', as: 'contacts' });
Contact.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

export {Room, User, Contact}
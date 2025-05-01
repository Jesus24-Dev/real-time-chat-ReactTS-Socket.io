import User from "./User";
import Room from './Room'
import Contact from "./Contact";

Room.belongsToMany(User, { through: 'RoomUser' });
User.belongsToMany(Room, { through: 'RoomUser' });

User.hasMany(Contact, {
    foreignKey: 'id_user',
    as: 'userContacts' 
});

User.hasMany(Contact, {
    foreignKey: 'id_contact',
    as: 'contactOfUsers'
});

Contact.belongsTo(User, {
    foreignKey: 'id_user',
    as: 'user' 
});

Contact.belongsTo(User, {
    foreignKey: 'id_contact',
    as: 'contact' 
});

export {Room, User, Contact}
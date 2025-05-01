import User from "./User";
import Room from './Room'
import Contact from "./Contact";

Room.belongsToMany(User, { through: 'RoomUser' });
User.belongsToMany(Room, { through: 'RoomUser' });

User.hasMany(Contact, {
    foreignKey: 'id_user',
    as: 'ownedContacts' 
});

User.hasMany(Contact, {
    foreignKey: 'id_contact',
    as: 'contactInLists'
});

Contact.belongsTo(User, {
    foreignKey: 'id_user',
    as: 'ownerUser' 
});

Contact.belongsTo(User, {
    foreignKey: 'id_contact',
    as: 'contactUser' 
});

export {Room, User, Contact}
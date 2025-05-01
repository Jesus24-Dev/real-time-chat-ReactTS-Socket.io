import User from "./User";
import Room from './Room'
import Contact from "./Contact";

Room.belongsToMany(User, { 
    through: 'RoomUser',
    uniqueKey: 'room_user_unique' 
  });
  
  User.belongsToMany(Room, { 
    through: 'RoomUser',
    uniqueKey: 'room_user_unique'
  });

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
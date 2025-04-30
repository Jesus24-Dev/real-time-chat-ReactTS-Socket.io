export default interface RoomAttributes {
    id?: number;
    id_admin: number;
    roomName: string;
    description: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
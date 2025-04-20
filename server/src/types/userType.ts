export default interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
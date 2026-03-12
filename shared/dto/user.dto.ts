type Role = 'admin' | 'user' | 'moderator'


export interface UserDTO {
    _id?: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    role: Role;
}
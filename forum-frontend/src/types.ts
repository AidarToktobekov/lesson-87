export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface Post{
    title: string;
    _id: string;
    description?: string;
    image?: string | null;
    idUser: string;
    datetime: Date;
}

export interface Comment{
    _id: string;
    idPost: string;
    idUser: string;
    text: string;
    datetime: Date;
}

export interface CommentMutation{
    idPost: string;
    text: string;
}
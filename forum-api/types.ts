import { Model, ObjectId } from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
    __confirmPassword: string;
  }
  
  export interface UserVirtuals {
    confirmPassword: string;
  }
  
  export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
  }
  
  export type UserModel = Model<UserFields, {}, UserMethods, UserVirtuals>;

export interface IComment{
  _id: ObjectId;
  text: string;
  idPost: string;
  idUser: ObjectId;
  datetime: Date;
}

export interface IPost{
  _id: ObjectId;
  title: string;
  description?: string;
  image?: string | null;
  idUser: string;
  datetime: Date;
}

export type PostMutation = Omit<IPost, '_id'>;
export type CommentMutation = Omit<IComment, '_id'>;

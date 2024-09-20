import mongoose, { Types } from "mongoose";
import User from "./User";
import Post from "./Post";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId)=>{
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User not found',
        }
    },
    idPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        validate: {
            validator: async(value: Types.ObjectId)=>{
                const post = await Post.findById(value);
                return Boolean(post);
            },
            message: 'Post does not exist',
        }
    },
    datetime: {
        type: Date,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
import mongoose, { Types } from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    datetime:{
        type: Date,
        required: true,
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import Comment from '../models/Comment';
import auth, { RequestWithUser } from '../middleware/auth';

const commentsRouter = express.Router();

commentsRouter.get('/:id', async(req, res, next)=>{
    try{
        const comments = await Comment.find({idPost: req.params.id});
        return res.send(comments);
    }catch(e){
        next(e);
    }
});

commentsRouter.post('/', auth,  async(req, res, next)=>{
    try{
        const user = (req as RequestWithUser).user;
        
        const commentData = {
            text: req.body.text,
            datetime: new Date(),
            idUser: user?._id,
            idPost: req.body.idPost,
        };
        
        const comment = new Comment(commentData);
        await comment.save();
        return res.send(commentData);
    }catch(error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
          }

        return next(error);
    }
});

export default commentsRouter;
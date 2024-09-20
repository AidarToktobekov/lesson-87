import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import Comment from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.get('/:id', async(req, res, next)=>{
    try{
        const comments = await Comment.find({idPost: req.params.id});
        return res.send(comments);
    }catch(e){
        next(e);
    }
});

commentsRouter.post('/', async(req, res, next)=>{
    try{
        const headerValue = req.get('Authorization');

        if (!headerValue) return res.status(400).send({error: 'Token not found'});
    
        const [_bearer, token] = headerValue.split(' ');
    
        if (!token) return res.status(400).send({error: 'Token not found'});
    
        const user = await User.findOne({token});
    
        if (!user) return res.status(400).send({error: 'User not found'});
    
        
        const commentData = {
            text: req.body.text,
            datetime: new Date(),
            idUser: user._id,
            idPost: req.body.idPost,
        };
        
        user.generateToken();
        await user.save();
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
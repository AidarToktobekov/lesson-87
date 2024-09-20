import express from 'express';
import Post from '../models/Post';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import { error } from 'console';
import User from '../models/User';

const postsRouter = express.Router();

postsRouter.get('/', async(req, res, next)=>{
    try{
        const posts = await Post.find();
        return res.send(posts);
    }catch(e){
        next(e);
    }
});

postsRouter.get('/:id', async(req, res, next)=>{
    try{
        const post = await Post.findById(req.params.id);
        return res.send(post);
    }catch(e){
        next(e);
    }
});

postsRouter.post('/', imagesUpload.single('image'), async(req, res, next)=>{
    try{
        const headerValue = req.get('Authorization');

        if (!headerValue) return res.status(400).send({error: 'Token not found'});
    
        const [_bearer, token] = headerValue.split(' ');
    
        if (!token) return res.status(400).send({error: 'Token not found'});
    
        const user = await User.findOne({token});
    
        if (!user) return res.status(400).send({error: 'User not found'});
    
        
        const postData = {
            title: req.body.title,
            description: req.body.description,
            datetime: new Date(),
            image: req.file ? req.file.filename : null, 
            idUser: user._id,
        };
        
        user.generateToken();
        await user.save();
        const post = new Post(postData);
        await post.save();
        return res.send(postData);
    }catch(error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
          }

        return next(error);
    }
});

export default postsRouter;
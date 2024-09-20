import express from 'express';
import Post from '../models/Post';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';

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

postsRouter.post('/', auth, imagesUpload.single('image'), async(req, res, next)=>{
    try{
        const user = (req as RequestWithUser).user;

        const postData = {
            title: req.body.title,
            description: req.body.description,
            datetime: new Date(),
            image: req.file ? req.file.filename : null, 
            idUser: user?._id,
        };
        
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
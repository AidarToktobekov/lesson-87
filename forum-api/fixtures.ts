import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const firstUser = new User({
    username: 'First user',
    password: '123',
  });
  const secondUser = new User({
    username: 'Second user',
    password: '321',
  });
  firstUser.generateToken();
  secondUser.generateToken();
  await firstUser.save();
  await secondUser.save();

  const [
    firstPost,
    secondPost
  ] = await Post.create({
    title: 'First post',
    description: 'hello',
    idUser: firstUser,
    datetime: new Date,
  }, {
    title: 'Second post',
    description: 'hi',
    idUser: secondUser,
    datetime: new Date,
  });

  const [
    firstPostComments,
    secondPostComments
  ] = await Comment.create({
    text: '1 comment',
    idUser: firstUser,
    idPost: firstPost,
    datetime: new Date,
  },{
    text: '2 comment',
    idUser: secondUser._id,
    idPost: firstPost,
    datetime: new Date,
  },{
    text: '3 comment',
    idUser: firstUser,
    idPost: secondPost,
    datetime: new Date,
  }, {
    text: '4 comment',
    idUser: firstUser,
    idPost: secondPost,
    datetime: new Date,
  });


  await db.close();
};

run().catch(console.error);
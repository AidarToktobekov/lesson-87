import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    // await db.dropCollection('');
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
  })

  firstUser.generateToken();
  secondUser.generateToken();
  await firstUser.save();
  await secondUser.save()

  await db.close();
};

run().catch(console.error);
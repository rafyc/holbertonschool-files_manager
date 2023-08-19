import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from "../utils/redis";

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    const user = await dbClient.db.collection('users').findOne({ email });

    if (!email) {
      return res.status(400).send({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }
    if (user) {
      return res.status(400).send({ error: 'Already exist' });
    }
    const hashedPassword = sha1(password);

    const newUser = await dbClient.db.collection('users').insertOne({ email, password: hashedPassword });
    const id = newUser.insertedId;
    return res.status(201).send({ id, email });
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];
    const key = `'auth_'${token}`;
    const userId = await redisClient.get(key);
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) })
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    return res.status(200).send({ id: user._id, email: user.email });
  }
}

export default UsersController;

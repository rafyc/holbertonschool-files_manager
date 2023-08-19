import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(req, res) {
    const encoded = req.headers.authorization.split(' ')[1];
    if (!encoded) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    const [email, password] = decoded.split(':');
    if (!email || !password) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const user = await dbClient.db.collection('users').findOne({ email, password: sha1(password) });
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const token = uuidv4();
    const key = `auth_${token}`;
    const duration = 86400;
    const userId = user._id.toString();
    await redisClient.set(key, userId, duration);
    return res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const key = `auth_${token}`;
    const user = redisClient.get(key);
    if (!user) {
      return response.status(401).send({ error: 'Unauthorized' });
    }
    await redisClient.del(key);
    return res.status(204).send();
  }
}

export default AuthController;

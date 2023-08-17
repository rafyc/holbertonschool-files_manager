import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email } = req.body;
    const { password } = req.body;
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
}

export default UsersController;

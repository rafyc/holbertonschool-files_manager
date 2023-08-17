import dbClient from '../utils/db';
import sha1 from 'sha1';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    const user = await dbClient.db.collection('users').findOne({ email });
    const hashedPassword = sha1(password);

    if (!email) {
      return res.status(400).send({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }
    if (user) {
      console.log('lolo');
      return res.status(400).send({ error: 'Already exist' });
    }
    const newUser = await dbClient.db.collection('users').insertOne({ email, pasword: hashedPassword });
    const id = newUser.insertedId;
    return res.status(201).send({ id, email });
  }
}

export default UsersController;

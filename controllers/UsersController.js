import dbClient from '../utils/db';
import sha1 from 'sha1';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    const user = dbClient.db.collection('users').findOne({ email });

    if (!email) {
      console.log('no mail');
      return res.status(400).send({ error: 'Missing email' })
    }
    if (!password) {
      console.log('no pass');
      return res.status(400).send({ error: 'Missing password' })
    }
    const hashedPassword = sha1(password);
    const newUser = await dbClient.db.collection('users').insertOne({ email, pasword: hashedPassword })

    if (user) {
      return res.status(400).send({ error: 'Already exist' })
    }
    return res.status(201).send({ id: newUser.insertedId, email });
  }
}

export default UsersController;

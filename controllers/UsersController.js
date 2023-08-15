import dbClient from '../utils/db';
import sha1 from 'sha1';

class UsersController {
  static async newUser(req, res) {
    const userEmail = req.email;
    const userPassword = req.password;
    const user = dbClient.db.collection('users').findOne({ email: userEmail });
    const hashedPassword = sha1(userPassword);
    const newUser = await dbClient.db.collection('users').insertOne({ email: userEmail, pasword: hashedPassword })

    if (!userEmail) {
      return res.status(400).send({ error: 'Missing email' })
    }
    if (!userPassword) {
      return res.status(400).send({ error: 'Missing password' })
    }
    if (user) {
      return res.status(400).send({ error: 'Already exist' })
    }
    return res.status(200).send(newUser);
  }
}

export default UsersController;

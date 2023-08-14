const router = express.Router();
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const AppController = {
  getStatus: async (req, res) => {
    const clientAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive;
    if (clientAlive & dbAlive)
      res.send({
        statusCode: 200,
        body: { "redis": true, "db": true }
      });
  },

  getStats: async (req, res) => {
    const nbUsers = await (dbClient.nbUsers);
    const nbFiles = await (dbClient.nbFiles);
    res.send({
      statusCode: 200,
      body: { "users": nbUsers, "files": nbFiles }
    })
  }
}

export default AppController;

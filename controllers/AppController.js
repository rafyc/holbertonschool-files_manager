import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const AppController = {
  getStatus: async (req, res) => {
    try {
      const clientAlive = redisClient.isAlive();
      const dbAlive = dbClient.isAlive();

      if (clientAlive && dbAlive) {
        res.status(200).send({
          statusCode: 200,
          body: { "redis": true, "db": true }
        });
      } else {
        res.status(500).send({
          statusCode: 500,
          error: "Service Unavailable",
          message: "One or more services are unavailable."
        });
      }
    } catch (error) {
      console.error("Error while checking status:", error);
      res.status(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: "An error occurred while checking status."
      });
    }
  },

  getStats: async (req, res) => {
    try {
      const nbUsers = await dbClient.nbUsers();
      const nbFiles = await dbClient.nbFiles();

      res.status(200).send({
        statusCode: 200,
        body: { "users": nbUsers, "files": nbFiles }
      });
    } catch (error) {
      console.error("Error while fetching statistics:", error);
      res.status(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: "An error occurred while fetching statistics."
      });
    }
  }
}

export default AppController;

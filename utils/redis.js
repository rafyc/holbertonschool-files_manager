import { createClient } from 'redis';
import util from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  isAlive() {
    const status = this.client.connected;
    return status;
  }

  async get(key) {
    const getAsync = util.promisify(this.client.get).bind(this.client);
    try {
      const value = await getAsync(key);
      return value;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async set(key, val, duration) {
    try {
      await this.client.set(key, val, 'EX', duration);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async del(key) {
    try {
      const deletedCount = await this.client.del(key);
      console.log(`Deleted ${deletedCount} keys`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;

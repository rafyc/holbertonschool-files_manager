import { createClient } from 'redis';

const client = createClient();
const getAsync = util.promisify(client.get).bind(client);

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log(`Redis client connected to the server`));

const isAlive = () => {
  client.on('connect', () => true);
  client.on('error', () => false);
}

const get = async (key) => {
  try {
    const value = await getAsync(key);
    return value;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

const set = async (key, duration) => {
  try {
    const value = await client.set(key, duration);
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

const del = async (key) => {
  try {
    const deletedCount = await client.del(key);
    console.log(`Deleted ${deletedCount} keys`);
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export default isAlive;

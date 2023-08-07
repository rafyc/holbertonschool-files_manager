import { MongoClient } from 'mongodb'

const DB_HOST = '127.0.0.1'
const DB_PORT = '27017'
const DB_DATABASE = 'files_manager';

const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url);
  }

  async isAlive() {
    try {
      await this.client.connect();
      this.db = this.client.db();
      return true
    } catch (err) {
      return false
    }
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const usersCollection = this.db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error retrieving user count:', error);
      throw error;
    } finally {
      this.client.close();
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const filesCollection = this.db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error retrieving file count:', error);
      throw error;
    } finally {
      this.client.close();
    }
  }
}


const dbClient = new DBClient();
export default dbClient;

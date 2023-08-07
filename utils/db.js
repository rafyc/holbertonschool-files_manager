import mongodb from 'mongodb';
class DBClient {
  constructor() {
    const DB_HOST = '127.0.0.1'
    const DB_PORT = '27017'
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${DB_HOST}:${DB_PORT}`;

    mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      this.db = client.db(DB_DATABASE);
    });
  }


  async isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}


const dbClient = new DBClient();
export default dbClient;

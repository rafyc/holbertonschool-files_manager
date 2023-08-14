import mongodb from 'mongodb';
class DBClient {
  constructor() {
    const host = process.env.DB_HOST || '127.0.0.1';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    mongodb.MongoClient.connect(url, { useUnifiedTopology: true })
      .then((client) => {
        this.db = client.db(database);
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error);
      });
  }

  isAlive() {
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

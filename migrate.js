const { MongoClient } = require("mongodb");
const jsonfile = require("jsonfile");

const uri =
  "mongodb+srv://eginugrahas:superindo@si-cluster.blzk5rg.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  async function migrateData() {
    try {
      const data = jsonfile.readFileSync('db.json');
      console.log(data)
      const db = await client.connect().then(() => {
        console.log('Connected to MongoDB Atlas');
        return client.db('SuperIndo');
      });
      for (const key of Object.keys(data)) {
        const items = data[key];
        const collection = await db.createCollection(key);
        console.log(`Created collection ${key}`);
        for (const item of items) {
          await collection.insertOne({ ...item });
        }
        console.log(`Inserted ${items.length} documents into collection ${key}`);
      }
      console.log('Data migrated successfully');
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }
  
  migrateData();
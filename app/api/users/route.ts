
import connect from '../../../mongo'

export async function getAllUsers() {
  try {
    const db = await connect();
    if (!db) {
      throw new Error('Failed to connect to database');
    }
    const collection = db.collection('users');
    const users = await collection.find().toArray();
    console.log(users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserById(id: number) {
  try {
    const db = await connect();
    if (!db) {
      throw new Error('Failed to connect to database');
    }
    const collection = db.collection('users');
    const user = await collection.findOne({ id });
    if (!user) {
      return null;
    }
    const userArray = await user.toArray();
    return userArray[0];
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
}

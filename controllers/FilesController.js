import dbClient from "../utils/db";
import redisClient from "../utils/redis";
import { ObjectId } from 'mongodb';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';



class FilesController {
  static async postUpload(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const { name, type } = req.body;
    const parentId = req.body.parentId || 0;
    const isPublic = req.body.isPublic || false;
    let data = ''
    if (type === 'file' || type === 'image') {
      data = request.body.data;
      if (!data) return response.status(400).send({ error: 'Missing data' });
    }

    if (!name) {
      return res.status(400).send({ error: 'Missing name' });
    }

    const typeOfType = ['folder', 'file', 'image'];
    if (!type || !typeOfType.includes(type)) {
      return res.status(400).send({ error: 'Missing type' });
    }

    if (parentId) {
      const file = await dbClient.db.collection('files').findOne({ _id: ObjectId(parentId) });
      if (!file) {
        return res.status(400).send({ error: 'Parent not found' });
      }
      if (file.type !== 'folder') {
        return res.status(400).send({ error: 'Parent is not a folder' });
      }
    }

    const id = user._id;
    let newFile = {
      id,
      name,
      type,
      isPublic,
      parentId
    };

    if (type === 'folder') {
      const { insertedId } = await dbClient.db.collection('files').insertOne({
        id, name, type, isPublic, parentId: parentId === 0 ? parentId : ObjectId(parentId),
        // id, name, type, isPublic, parentId
      });
      return res.status(201).send({ id: insertedId, ...newFile });
    }

    const path = process.env.FOLDER_PATH || '/tmp/files_manager';
    const folderName = `${path}/${uuidv4()}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recurisve: true });
    }
    const content = Buffer.from(data, 'base64').toString('utf-8');
    fs.writeFileSync(folderName, content);

    const { insertedId } = await dbClient.db.collection('files').insertOne({
      id, name, type, parentId, isPublic, localPath: folderName,
    });

    return res.status(201).send({
      id: insertedId, userId, name, type, isPublic, parentId,
    });
  }
}

export default FilesController;

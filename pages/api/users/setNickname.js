import { getToken } from 'next-auth/jwt';
import log from '../../../lib/logging';
import { withMongo } from '../../../lib/mw';


async function handler(req, res) {
  if (req.method === 'POST') {
    const { uid, newNickname } = req.body;

    const sessionUid = (await getToken({ req })).uid;

    if (uid !== sessionUid) {
      res.status(401).json({});
      return;
    }

    const user = await withMongo('data', async (db) => {
      const collection = db.collection('users');
      return await collection.findOne({ id: uid });
    });


    if (user) {



      const updateDoc = {
        $set: {
          name: newNickname,
        }
      };


      log('Name changed. Name: ' + newNickname + ' id: ' + uid);

      const result = await withMongo('data', async (db) => {
        const collection = db.collection('users');
        return await collection.updateOne(user, updateDoc, { upsert: false });
      });


      res.status(201).json({ message: 'The nickname has been successfully changed' });
      return;


    } else {
      res.status(404).json({ message: 'User does not exist' });

      return;
    }


  } else {
    res.status(500).json({ message: 'Route not valid' });
  }
}

export default handler;
import { withMongo } from '../../../lib/mw';

import { randomBytes } from 'crypto';


import { hash } from 'bcryptjs';
import { createTransport } from "nodemailer"

async function handler(req, res) {
  if (req.method === 'POST') {
    const { uid, secret, newPassword } = req.body;

    const user = await withMongo('data', async (db) => {
      const collection = db.collection('users');
      return await collection.findOne({ id: uid });
    });


    if (user) {

      if (!('password' in user)) {
        res.status(403).json({ message: 'User does not have password' });
        return;
      }
      if (!('passwordResetSecret' in user)) {
        res.status(403).json({ message: 'User did not request a password reset' });
        return;
      }

      if (secret !== user.passwordResetSecret){
        res.status(403).json({ message: 'Please try again' });
        return;
      }

      const updateDoc = {
        $set: {
          password: await hash(newPassword, 12),
        }
      };

      const result = await withMongo('data', async (db) => {
        const collection = db.collection('users');
        return await collection.updateOne(user, updateDoc, { upsert: false });
      });


      res.status(201).json({ message: 'The password has been successfully changed' });
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
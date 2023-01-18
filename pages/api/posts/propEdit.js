import { withMongo } from '../../../lib/mw';

import Date from 'dayjs';
import { getToken } from 'next-auth/jwt';
import log from '../../../lib/logging';
async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { id, field, value } = req.body;

        const updateDoc = { $set: { time: Date().toDate() } };

        updateDoc['$set'][field] = value;

        const post = await withMongo('data', async (db) => {
            const collection = db.collection('posts');
            return await collection.findOne({ id: id });
        });

        const sessionUid = (await getToken({ req })).uid;

        if (post.createdBy !== sessionUid) {
            res.status(401).json({});
            return;
        }

        log('Post edited: ' + process.env.SITE_URL + '/posts/' + id);

        const result = await withMongo('data', async (db) => {
            const collection = db.collection('posts');
            return await collection.updateOne(post, updateDoc, { upsert: false });
        });

        await res.revalidate('/posts/' + id);

        //Send success response
        res.status(201).json({ message: 'Post edited' });

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
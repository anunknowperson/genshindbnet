import { getToken } from 'next-auth/jwt';
import { withMongo } from '../../../lib/mw';

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { id } = req.body;


        const post = await withMongo('data', async (db) => {
            const collection = db.collection('posts');
            return await collection.findOne({ id: id });
        });

        const sessionUid = (await getToken({ req })).uid;

        if (post.createdBy !== sessionUid) {
            res.status(401).json({});
            return;
        }

        const result = await withMongo('data', async (db) => {
            const collection = db.collection('posts');
            return await collection.deleteOne({ id: id });
        });



        //Send success response
        res.status(201).json({ message: 'Post edited' });

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
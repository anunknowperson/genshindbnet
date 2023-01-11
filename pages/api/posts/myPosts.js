import { withMongo } from '../../../lib/mw';

async function handler(req, res) {

    const { uid } = req.query;

    const posts = await withMongo('data', async (db) => {
        const collection = db.collection('posts')
        return await collection.find({ createdBy: uid }, {projection: { "_id" : 0, "id" : 1, "name" : 1,  "type" : 1, "lang" : 1, "public" : 1, "character" : 1}}).toArray()
    });

    //Send success response
    res.status(200).json({total: posts.length, posts: posts});

}

export default handler;
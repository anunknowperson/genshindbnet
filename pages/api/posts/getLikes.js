import { withMongo } from '../../../lib/mw';

async function handler(req, res) {

    const { uid, postId } = req.query;


    const likes = await withMongo('data', async (db) => {
        const collection = db.collection('likes')

        return await collection.find({ post: postId }, { projection: { "_id": 0, "likes": 1 } }).toArray()
    });

    

    var like = likes[0];
    


    var count = like.likes.length;

    var my = like.likes.includes(uid);

    //Send success response
    res.status(200).json({ count: count, my: my });

}

export default handler;

import { withMongo } from '../../../lib/mw';

async function handler(req, res) {

    const { postId } = req.query;



    const comments = await withMongo('data', async (db) => {
        const collection = db.collection('comments')

        return await collection.find({ post: postId }, { projection: { "_id": 0, "list": 1 } }).toArray()
    });


    var list = [];

    if (comments.length != 0){
        list = comments[0].list;
    }

    //Send success response
    res.status(200).json(list);

}

export default handler;
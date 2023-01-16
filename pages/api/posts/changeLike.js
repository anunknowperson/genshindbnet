import { withMongo } from '../../../lib/mw';

import { getToken } from "next-auth/jwt"

async function handler(req, res) {

    

    const { uid, postId, check } = req.query;

    const sessionUid =  (await getToken({ req })).uid;

    if (uid !== sessionUid) {
        res.status(401).json({});
        return;
    }

    const likes = await withMongo('data', async (db) => {
        const collection = db.collection('likes')

        return await collection.find({ post: postId }, { projection: { "_id": 0, "likes": 1 } }).toArray()
    });

    var like = likes[0];


    var likesList = like.likes;

    var updateDoc;

    if (check == 'true') {

        if (!likesList.includes(uid)) {
            updateDoc = { $push: { 'likes': uid } };
        }

    } else if (check == 'false') {
        if (likesList.includes(uid)) {
            updateDoc = { $pull: { 'likes': uid } };
        }
    }

    const post = await withMongo('data', async (db) => {
        const collection = db.collection('likes');
        return await collection.findOne({ post: postId });
    });

    const result = await withMongo('data', async (db) => {
        const collection = db.collection('likes');
        return await collection.updateOne(post, updateDoc, { upsert: false });
    });

    //Send success response
    res.status(200).json({});

}

export default handler;
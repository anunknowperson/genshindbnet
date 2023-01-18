import { withMongo } from '../../lib/mw';

import Date from 'dayjs';

async function handler(req, res) {

    const { type } = req.query;

    var queryfilter = { public: true };

    if (type === 'official') {

        queryfilter['createdBy'] = '439968e5-39fb-4601-a744-31cd414cf336';

    } else if (type === 'character') {
        queryfilter['type'] = 'character';
    } else if (type === 'tutorial') {
        queryfilter['type'] = 'post';
    }

    var posts = await withMongo('data', async (db) => {
        const collection = db.collection('posts')
        return await collection.find(queryfilter, { projection: { "_id": 0, "id": 1, "name": 1, "createdBy": 1, "lang": 1, "description": 1, "time": 1, "likes": 1 } }).toArray()
    });

    for (const post of posts) {

        const user = await withMongo('data', async (db) => {
            const collection = db.collection('users')
            return await collection.find({ id: post.createdBy }, { projection: { "_id": 0, "name": 1 } }).toArray()
        });

        post.createdBy = user[0].name;

        const likes = await withMongo('data', async (db) => {
            const collection = db.collection('likes')
            return await collection.find({ post: post.id }, { projection: { "_id": 0, "likes": 1 } }).toArray()
        });

        post['likes'] = likes[0].likes.length;
    }


    const now = Date();

    posts = posts.sort((a, b) => {

        return Math.abs(Date(a['time']) - now) - Math.abs(Date(b['time']) - now);


    });


    //Send success response
    res.status(200).json(posts.slice(0, 3));

}

export default handler;
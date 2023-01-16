import { withMongo } from '../../../lib/mw';

import Date from 'dayjs';

async function handler(req, res) {

    const { langs, sort, page, recordsPerPage, search } = req.query;

    var queryfilter = { public: true, type: "post" };

    if (search !== '') {

        queryfilter['$text'] = { $search: search };

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


    const langsFilter = JSON.parse(langs);

    posts = posts.filter((item) =>
        langsFilter.includes((item.lang))
    );

    const now = Date();

    posts = posts.sort((a, b) => {
        if (sort === 'recent') {
            return Math.abs(Date(a['time']) - now) - Math.abs(Date(b['time']) - now);
        } else if (sort === 'top') {

            return b.likes - a.likes;
        }

    });


    const total = posts.length;

    const skip = (parseInt(page) - 1) * parseInt(recordsPerPage);

    posts = posts.slice(skip, skip + parseInt(recordsPerPage));

    //Send success response
    res.status(200).json({ total: total, posts: posts });

}

export default handler;
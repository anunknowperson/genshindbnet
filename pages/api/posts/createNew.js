import { withMongo } from '../../../lib/mw';

import { nanoid } from 'nanoid'

import Date from 'dayjs';
import { getToken } from 'next-auth/jwt';
import log from '../../../lib/logging';

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { uid, type, lang } = req.body;

        const sessionUid = (await getToken({ req })).uid;

        if (uid !== sessionUid) {
            res.status(401).json({});
            return;
        }

        var postId = ((await withMongo('data', async (db) => {
            return await db.collection('globals').findOneAndUpdate(
                { "name": "postIdCounter" },
                { $inc: { "val": 1 } },
                { upsert: true },

            );
        })).value.val).toString(36);


        var postType = 'post';

        if (type === 'post') {
            postType = 'post';
        } else if (type === 'character') {
            postType = 'character';
        }

        const checkExisting = await withMongo('data', async (db) => {
            const collection = db.collection('posts');
            return await collection.findOne({ createdBy: uid, name: 'My new post' });
        });

        if (checkExisting) {
            res.status(422).json({ message: 'New post already exists' });
            return;
        }

        await withMongo('data', async (db) => {
            return await db.collection('likes').insertOne({
                post: postId,
                likes: [],
            });
        });

        await withMongo('data', async (db) => {
            return await db.collection('posts').insertOne({
                id: postId,
                createdBy: uid,
                type: postType,
                name: 'My new post',
                public: false,
                lang: lang,

                character: 'hutao',

                artifacts: [],
                weapons: [],
                comments: {
                    't1': '',
                    't2': '',
                    't3': '',
                    't4': '',
                    'p1': '',
                    'p2': '',
                    'p3': '',
                    'c1': '',
                    'c2': '',
                    'c3': '',
                    'c4': '',
                    'c5': '',
                    'c6': '',
                },

                description: '',

                time: Date().toDate(),


                teams: [],

                content: '<blockquote><p>You can start writing here…</p></blockquote>',
            });
        });

        log('New post created: ' + process.env.SITE_URL + '/posts/' + postId);

        //Send success response
        res.status(201).json({ message: 'Post created' });

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
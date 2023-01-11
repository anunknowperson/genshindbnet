import { withMongo } from '../../../lib/mw';

import { nanoid } from 'nanoid'

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { uid, type, lang } = req.body;

        var postId = nanoid();
        var postType = 'post';

        if (type === 'post'){
            postType = 'post';
        } else if (type === 'character') {
            postType = 'character';
        }

        const checkExisting = await withMongo('data', async (db) => {
            const collection = db.collection('posts');
            return await collection.findOne({ name: 'My new post' });
          });

        if (checkExisting) {
            res.status(422).json({ message: 'New post already exists' });
            return;
        }

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
                    't1' : '',
                    't2' : '',
                    't3' : '',
                    't4' : '',
                    'p1' : '',
                    'p2' : '',
                    'p3' : '',
                    'c1' : '',
                    'c2' : '',
                    'c3' : '',
                    'c4' : '',
                    'c5' : '',
                    'c6' : '',
                },

                teams: [],

                content: '<blockquote><p>You can start writing here…</p></blockquote>',
            });
          });

        
        //Send success response
        res.status(201).json({ message: 'Post created'});

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
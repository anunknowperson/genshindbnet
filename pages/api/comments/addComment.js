import { withMongo } from '../../../lib/mw';

import { nanoid } from 'nanoid'

import Date from 'dayjs';
import log from '../../../lib/logging';

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { postId, trace, text, name } = req.body;

        var comments = await withMongo('data', async (db) => {
            const collection = db.collection('comments')

            return await collection.find({ post: postId }, { projection: { "_id": 0, "list": 1 } }).toArray()
        });



        if (comments.length == 0) {

            await withMongo('data', async (db) => {
                const collection = db.collection('comments')

                return await collection.insertOne({ post: postId, list: [] });
            });

            comments = await withMongo('data', async (db) => {
                const collection = db.collection('comments')

                return await collection.find({ post: postId }, { projection: { "_id": 0, "list": 1 } }).toArray()
            });
        }


        var fpath = 'list';

        var commObj = comments[0].list;


        for (var t = 0; t < trace.length; t++) {

            for (var i = 0; i < commObj.length; i++) {


                if (commObj[i].id === trace[t]) {
                    commObj = commObj[i].children;
                    if (t == 0) {
                        fpath += '.' + i;
                    } else {
                        fpath += '.children.' + i;
                    }

                    break;
                }
            }



        }

        if (commObj == undefined) {
            await withMongo('data', async (db) => {
                const collection = db.collection('comments')

                var newCommentId = nanoid();

                var change = {};
                change[fpath + '.children'] = [{

                    name: name,
                    date: Date().toString(),
                    text: text,
                    id: newCommentId,

                }];

                log('New comment created: ' + process.env.SITE_URL + '/posts/' + postId + '\nid: ' + newCommentId + '\nText: ' + text);

                return await collection.updateOne(
                    { post: postId },
                    {
                        $set: change,
                    }
                )
            });
        }

        if (trace.length == 0) {
            await withMongo('data', async (db) => {
                const collection = db.collection('comments')

                var newCommentId = nanoid();

                log('New comment created: ' + process.env.SITE_URL + '/posts/' + postId + '\nid: ' + newCommentId + '\nText: ' + text);

                return await collection.updateOne(
                    { post: postId },
                    {
                        $push: {
                            list: {
                                name: name,
                                date: Date().toString(),
                                text: text,
                                id: newCommentId,
                            }
                        },
                    }
                )

                
            });
        }

        


        //Send success response
        res.status(201).json({ message: 'Post created' });

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
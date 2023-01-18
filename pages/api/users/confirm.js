import { withMongo } from '../../../lib/mw';

async function handler(req, res) {

    const { uid, secret, redirect } = req.query;

    const user = await withMongo('data', async (db) => {
        const collection = db.collection('users');
        return await collection.findOne({ id: uid });
    });


    //Send error response if duplicate user is found
    if (user) {

        if (user.verificationSecret == secret) {
            const updateDoc = {
                $set: {
                    needVerification: false,
                }

            };
            const result = await withMongo('data', async (db) => {
                const collection = db.collection('users');
                return await collection.updateOne(user, updateDoc, { upsert: false });
            });

            res.writeHead(302, {
                Location: redirect + '?afterConfirm=yes',
                
            });
            
            res.end();

            return;
        } else {
            res.status(201).json({ message: 'Invalid secret' });

            return;
        }

    } else {
        res.status(404).json({ message: 'User does not exist' });

        return;
    }



}

export default handler;
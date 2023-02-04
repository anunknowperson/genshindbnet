import nextConnect from 'next-connect';
import multer from 'multer';

import { nanoid } from 'nanoid';

const maxSize = 15*1024*1024;

var id = nanoid();

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/useruploads/',
    filename: (req, file, cb) => cb(null, id  + '.' + file.originalname.split('.').pop()),
  }),
  limits: { fileSize: maxSize }
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('upload'));

apiRoute.post((req, res) => {

  res.status(200).json({ url: '/useruploads/' + id + '.' + req.file.originalname.split('.').pop() });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
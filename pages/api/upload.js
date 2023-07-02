import multer from 'multer';

const upload = multer({ dest: '/home/ubuntu/Desktop/YolloFront/yollo/uploads/' });

export default function handler(req, res) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'File upload failed' + err});
    }

    res.status(200).json({ success: true });
  });
}

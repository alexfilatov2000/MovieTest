import multer from '@koa/multer';
const storage = multer.memoryStorage();

export const txtUpload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'text/plain') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});

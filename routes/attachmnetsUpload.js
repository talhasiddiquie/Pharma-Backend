const express = require("express");
const router = express.Router();
const AttachmentsUpload = require('../models/attachmnetsUpload');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null,
            `${file.fieldname}-${Date.now()}-${Math.random() * 1000}${path.extname(file.originalname)}`
        );
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype !== ""
        // file.mimetype === "image/png" ||
        // file.mimetype === "image/jpg" ||
        // file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("File format should unvalid"), false);
    }
};

// var upload = multer({ dest: 'uploads/' }).single('File');
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
});

router.post('/uploadAttachments', upload.single('file'), (req, res, next) => {
    var postAttachmentsUploadData;
    if (req.file) {
        postAttachmentsUploadData = new AttachmentsUpload({
            fileName: req.file.filename,
            path: req.file.path,
            fileType: req.file.mimetype
        })
        postAttachmentsUploadData.save(function (err, data) {
            if (!req.file) {
                res.send({
                    code: 500,
                    content: 'Internal Server Error',
                    msg: 'API not called properly'
                })
            }
            else if (req.file) {
                const body = req.file
                // sharp(body.path, { failOnError: false })
                //     .resize(200, 200)
                //     .withMetadata()
                //     .toFile(
                //         path.resolve(body.destination, body.filename.replace(/\.(jpeg|png)$/, `.jpg`))
                //     )
                // fs.unlinkSync(body.path)
                res.send({
                    code: 200,
                    msg: 'Attachments Upload successfully',
                    content: data,
                });
            }
        })
    }
    else {
        postAttachmentsUploadData = new AttachmentsUpload({
            image: '',
            path: ''
        })
        postAttachmentsUploadData.save(function (err, data) {
            if (!req.file) {
                res.send({
                    code: 500,
                    content: 'Internal Server Error',
                    msg: 'API not called properly'
                })
            }
        })

    }
});

module.exports = router;

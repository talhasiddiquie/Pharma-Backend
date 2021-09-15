var mongoose = require('mongoose');
const { Schema } = mongoose;

var AttachmentsUpload = new Schema({
    path: {
        type: String,
        default: 'none',
    },
    fileName: {
        type: String,
    },
    fileType: {
        type: String
    }
});

const AttachmentsUploads = mongoose.model('AttachmentsUpload', AttachmentsUpload);
module.exports = AttachmentsUploads;
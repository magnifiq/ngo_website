const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    image_url: String,
    title: String,
    text: String,
    creation_date: { type: Date, default: Date.now },
    edit_date: Date,
});

module.exports = mongoose.model('News', newsSchema);

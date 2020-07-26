var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'State' },
    title: { type: String, lowercase: true, trim: true, required: true },
    body: { type: String, lowercase: true, trim: true, required: true },
    image: { type: String, lowercase: true, trim: true },
    created_at: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
});

module.exports = mongoose.model('Posts', postSchema);
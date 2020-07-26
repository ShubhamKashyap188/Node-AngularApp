var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fname: { type: String, lowercase: true, trim: true },
    lname: { type: String, lowercase: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
});

module.exports = mongoose.model('Users', userSchema);
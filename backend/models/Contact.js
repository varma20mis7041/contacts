
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: {type:String , required : true},
    phone : {type : String , require : true}
});

module.exports = mongoose.model('Contact', contactSchema);

const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String, 
    required: true,
    match: /.{25,}/
  },
  // Add the 3 new properties below
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});


const patternSchema = new Schema({
  name: {
    type: String,
  },
  materials: {
    type: [String],
  },
  details: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  difficulty: {
    type: Number,
    enum: ['1', '2', '3', '4', '5']
  },
  instructions: {
    type: String,
  },
  comments: [commentSchema],
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String,
}, {
  timestamps: true
});


// Compile the schema into a model and export it
module.exports = mongoose.model('Pattern', patternSchema);
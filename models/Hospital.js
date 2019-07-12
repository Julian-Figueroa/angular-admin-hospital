const moongose = require('mongoose');

const HospitalSchema = moongose.Schema({
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  }
});

module.exports = moongose.model('hospital', HospitalSchema);

const mongoose = require('mongoose');

const bloomSchema = mongoose.Schema({
     created: {
          type: Date,
          default: Date.now
     },
     user_id: String
});

bloomSchema.virtual('date').get(function() {
     return `${this.created}`.slice(0,16);
});


bloomSchema.methods.apiRepr = function() {
     return {
          created: this.date, //uses virtual to set format
          user_id: this.user_id
     };
}

const Bloom = mongoose.model('Bloom', bloomSchema);

module.exports = {Bloom};

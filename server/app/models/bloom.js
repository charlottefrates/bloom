const mongoose = require('mongoose');

const bloomSchema = mongoose.Schema({
     zones: [String],
     days: [String],
     gal_min: Number,
     min: Number,
     projected: Number,
     user_id: String,
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
          id: this._id,
          zones: this.zones,
          days: this.days,
          gal_min: this.gal_min,
          min: this.min,
          projected: this.projected,
          created: this.date, //uses virtual to set format
          user_id: this.user_id
     };
}

const Bloom = mongoose.model('Bloom', bloomSchema);

module.exports = {Bloom};

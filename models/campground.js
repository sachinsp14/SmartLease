var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   ownerName: String,
   ownerEthAddr: String,
   tenantName: String,
   tenantEthAddr: String,
   address: String,
   lat: Number,
   lng: Number,
   startDate: Date,
   rent: Number,
   deposit: Number,
   contractClause: String,
   active: Boolean,
   terminate: Boolean,
   createdAt: {type: Date, default: Date.now},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
const mongoose = require("mongoose");

const SponsorSchema = new mongoose.Schema(
  {
    nameSponsor: {
        type: String,
        required: true
    },
    contactPerson: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 

    phone : {
        type: String,
        required: true
    },
    logo : {
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sponsor", SponsorSchema);



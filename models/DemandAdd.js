const mongoose = require("mongoose");
const State = require("./enums/StateDemand");

const DemandAddSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      enum :State,
      default: State.INPROGRESS,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    organisation: {
      organisationName: {
        type: String,
        required: [true, "Enter the name of the organisation"],
      },
      
      phoneNumber: {
        type: String,
        required: [true, "Enter the phone number of the organisation"],
      },
      
      address: {
        type: String,
        required: [true, "Enter the address of the organisation"],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DemandAdd", DemandAddSchema);



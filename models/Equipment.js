const mongoose = require('mongoose');
const EquipementSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Enter the name of the Equipement"],
      },
    description:{
        type: String,
        required: [true, "Enter a description of the Equipement"],
      },
    model:{
        type: String,
        required: [true, "Enter the model of the Equipement"],
      },
      purchase_date:{
        type: String,
        required: [true, "Enter the purchase date of the Equipement"],
      },
    status:{
        type: String,
        required: [true, "Enter the status of the Equipement"],
      },
    barcode:{
        type: String,
        required: [true, "Enter the barcode of the organisation"],
      }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Equipement', EquipementSchema);
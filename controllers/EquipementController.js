const Equipement = require('../models/Equipment');

//create and save new Equipement
const createEquipement = async (req,res)=>{

    //validate request
    if(!req.body){
        return res.status(400).send({message:"please comlplete all field" });
    }
    //create new equipement
    const equipement = new Equipement({
        name:req.body.name,
        description:req.body.description,
        model:req.body.model,
        purchase_date:req.body.purchase_date,
        status:req.body.status,
        barcode:req.body.barcode
    });
    //save equipement in data base
    equipement.save().then(data =>{res.send(data)}).catch(err=>{
        res.status(500).send({message:err.message})
    })
};

const getEquipements = async (req,res)=>{
    Equipement.find().then(equipements =>{
        res.send(equipements);
    }).catch(err=>{
        res.status(500).send({message:"something wrong while getting list of equipements"})
    })

};

const getEquipementByid = async (req,res)=>{
    Equipement.findById(req.params.id).then(equipement =>{
        if(!equipement){
            return res.status(404).send({message:"equipement not found with this" +req.params.id});
        }
        res.send(equipement);
    }).catch(err=>{
        if(err.kind === "ObjectId"){
            return res.status(404).send({message:"error getting equipement with  id" + req.params.id});
        }
        return res.status(500).send({message:"something wrong while getting equipements"});
    });

}

const deleteEquipement = async(req,res)=>{
    Equipement.findByIdAndDelete(req.params.id)
    .then((equipement)=>{
        if(!equipement){
            return res.status(404).send({message:"equipement not found with this id" + req.params.id});
        }
        res.send({message:"equipement deleted successfully"});
    }).catch((err)=>{
        if(err.kind === "ObjectId"){
            return res.status(404).send({message:"error getting equipement with  id" + req.params.id});
        }
        return res.status(500).send({message:"could not delet equipement with" +req.params.id});

    });
};

const updateEquipement = async (req,res)=>{
    //validate request
    if(!req.body){
        return res.status(400).send({message:"please fill all required fields"});
    }
     Equipement.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        description:req.body.description,
        model:req.body.model,
        purchase_date:req.body.purchase_date,
        status:req.body.status,
        barcode:req.body.barcode
     },{new: true}
     ).then(equipement=>{
        if(!equipement){
            return res.status(404).send({message:"equipement not found"});
        }
        res.send(equipement);
     }).catch((err)=>{
        if(err.kind === "ObjectId"){
            return res.status(404).send({message:"error getting equipement with  id" + req.params.id});
        }
        return res.status(500).send({message:"could not update equipement with" +req.params.id});
    });
};

module.exports={
    createEquipement,
    getEquipements,
    getEquipementByid,
    deleteEquipement,
    updateEquipement
}
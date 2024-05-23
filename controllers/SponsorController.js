const Sponsor = require ('../models/Sponsor')

// get Sponsor by bel ID
const GetSponsor = async (req,res)=>{
    try 
    {
        const sponsorId = req.params.sponsorId;
        const Sponsor = await sponsor.findById(sponsorId);
        if (!Sponsor) 
        {
            return res.status(404).json({ message: "Sponsor mouch mawjoud" });
        }
        
        res.json(Sponsor);
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    } 
}

// insertion d'un sponsor jdid 
const AddSponsor = async (req, res) => {
    try {
      const { nameSponsor, contactPerson, email, phone, website } = req.body;
  
      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Logo file is required' });
      }
  
      const logo = req.file.path; // Save the path of the uploaded file
  
      const new_Sponsor = new Sponsor({
        nameSponsor,
        contactPerson,
        email,
        phone,
        logo,
        website,
      });
  
      await new_Sponsor.save();
      res.status(201).json({ message: 'Sponsor added successfully', sponsor: new_Sponsor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
  
}
// get all sponsors 

const GetAllSponsors = async (req,res) =>{
    const sponsors = await Sponsor.find()
    if(!sponsors.length){
        res.status(400).json({message : "No sponsors"});
    }
    res.json(sponsors)
}
// update by id 

const UpdateSponsor = async (req,res)=>{
    try{
        const sponsorId = req.params.sponsorId;
        const Spon = await Sponsor.findById(sponsorId)
        if (!Spon) {
            return res.status(404).json({ message: "Sponsor pas mawjoud" });
        }
        await sponsor.findByIdAndUpdate(sponsorId, req.body, { new: true });
        res.json({ message: "Sponsor updated" });

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });

    }
}

// delete by id 
const DeleteSponById = async (req, res) => {
    try {
        const sponsorId = req.params.sponsorId;

        // Check if the sponsor exists
        const foundSponsor = await Sponsor.findById(sponsorId); 
        if (!foundSponsor) {
            return res.status(404).json({ message: "Sponsor not found" });
        }

        // If the sponsor exists, delete it
        await Sponsor.findByIdAndDelete(sponsorId);

        res.json({ message: "Sponsor deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports={
    GetSponsor,
    AddSponsor,
    GetAllSponsors,
    DeleteSponById,
    UpdateSponsor
}


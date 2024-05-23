const express = require("express")
const router=express.Router();
const SponsorController=require('../controllers/SponsorController');
const verifyRole=require("../middleware/verifyRole")
const upload = require("../middleware/storage");

const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT)

router.post('/add',  upload.single('logo'),SponsorController.AddSponsor);
router.get('/get/:sponsorId',SponsorController.GetSponsor);
router.get('/all',SponsorController.GetAllSponsors);
router.delete('/delete/:sponsorId',SponsorController.DeleteSponById);
router.put('/update/:sponsorId',SponsorController.UpdateSponsor);

module.exports = router;





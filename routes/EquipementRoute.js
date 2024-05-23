const express = require('express');
const router = express.Router();
const equipementController =require('../controllers/EquipementController');
const verifyJWT = require("../middleware/verifyJWT");
const verifyRole = require("../middleware/verifyRole");

router.use(verifyJWT); // Vérifie le jeton JWT pour l'authentification
router.use(verifyRole); // Vérifie le rôle de l'utilisateur

// Middleware pour vérifier si l'utilisateur est un administrateur
function isAdmin(req, res, next) {
    if (req.userRole === "ADMIN") {
      next(); // Passe à la prochaine fonction middleware
    } else {
      res.status(403).json("Unauthorized: Invalid role"); // Renvoie une erreur si l'utilisateur n'est pas un administrateur
    }
  }

//create equip
router.post('/createEquipement', isAdmin,equipementController.createEquipement)
//get list of equipement
router.get('/getEquipement',equipementController.getEquipements)
//get by id
router.get('/getByid/:id',equipementController.getEquipementByid)
//delete
router.delete('/delete/:id',isAdmin,equipementController.deleteEquipement)
//update
router.put('/update/:id',isAdmin,equipementController.updateEquipement)
module.exports = router
const DemandAdd = require("../models/DemandAdd");
const User = require("../models/User");
const StateDemand = require("../models/enums/StateDemand");
const Notification = require("../models/notificationModel");
const { sendAcceptanceEmail } = require("../utils/sendEmail");

// Function to find admin user by role
const findAdminUser = async () => {
  try {
    // Find the user with role "admin"
    const adminUser = await User.findOne({ role: 'ADMIN' });
    return adminUser ? adminUser._id : null; // Return the ID if found, otherwise null
  } catch (error) {
    console.error('Error finding admin user:', error);
    return null;
  }
};


const sendDemand = async (req, res) => {
  try {
    const { state, organisation } = req.body;

    if ((!state, !organisation)) {
      return res.status(404).json({ message: "Fields required" });
    }
    const clientId = req.user;
    console.log("client id", clientId);

    const newDemand = new DemandAdd({
      state: StateDemand.INPROGRESS,
      organisation: organisation,
      client: clientId,
    });
    // Save the demand to the database
    await newDemand.save();

    //Send notification to the admin
    const adminId = await findAdminUser();
    if (adminId) {
      console.log('Admin user ID:', adminId);
    } else {
      console.log('Admin user not found');
    }   
    const notificationMessage = `New demand received from client: ${clientId}`;
    const newNotification = new Notification({
      message: notificationMessage,
      sender: clientId,
      receiver: adminId,
    });


    await newNotification.save();


    res.status(201).send({message : "Demand sended successfully",demand: newDemand});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getDemandByClient = async (req, res) => {
  try {
    const clientId = req.user; 
    const demands = await DemandAdd.find({ client: clientId }).populate('client', 'email');
    res.json(demands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


const updateDemandState = async (req, res) => {
  try {
    const { state } = req.body;
    const demandId = req.params.id;
    console.log("state", state);
    console.log("demand id", demandId);
    // Validate request body : state
    if (!state) {
      return res.status(400).json({ message: "state is a required field" });
    }

    // Find the demand by ID
    const demand = await DemandAdd.findById(demandId);
    if (!demand) {
      return res.status(404).json({ message: "Demand not found" });
    }

    // Update the state of the demand
    demand.state = state;
    await demand.save();
    await Notification.findOneAndDelete({ message: `New demand received from client: ${demand.client}` });

    if (state === 'ACCEPTED') {
      // Fetch user details from the database using the demand.client ID
      const user = await User.findById(demand.client);
      
      // Check if the user exists and has an email
      if (user && user.email) {
        // Replace 'user.email', 'user.username', and 'link' with appropriate values
        await sendAcceptanceEmail(user.email, user.firstname, 'https://example.com');
      } else {
        console.log('User not found or does not have an email');
      }
    }


    
    res
      .status(200)
      .json({
        message: "Demand state updated successfully",
        updatedDemand: demand,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getDemand = async (req, res) => {
  try {
    const demands = await DemandAdd.find({ state: 'IN PROGRESS' }).populate('client', 'email');
    res.json(demands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getDemandById = async (req, res) => {
  try {
    const demand = await DemandAdd.findById(req.params.id).populate('client', 'email');
    if (!demand) {
      return res.status(404).json({ message: 'Demand not found' });
    }
    res.json(demand);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  sendDemand,
  updateDemandState,
  getDemand,
  getDemandById,
  getDemandByClient
};

// Import the Express framework to create a router
const express = require('express');

// Create a new router object from Express
const router = express.Router();

// Import the UserActivity Sequelize model
const UserActivity = require('../models/UserActivity');

// Import the User Sequelize model (to associate activities with users)
const User = require('../models/User');

// Import the Title Sequelize model using object destructuring
// This assumes that the Title model is exported as { Title } in its module
const { Title } = require('../models/Title');

// Import the token verification utility
// This is likely a middleware function to protect routes and validate user identity
const { verifyToken } = require('../utils/tokens');

router.get('/', verifyToken, (req, res) => {
    UserActivity.findAll({
        include: [{
            model: User, as: "user", attributes: ["username"]
        },
        {
            model: Title, as: "title", attributes: ["title"]
        }],
        order: [["createdAt", "DESC"]]
    }).then(data => res.send(data)).catch(err => res.status(500).send(err))
})

module.exports = router

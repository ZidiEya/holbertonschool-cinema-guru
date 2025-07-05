// Import the Express framework to create a router for handling endpoints
const express = require('express');

// Initialize a new router instance to define and group API routes
const router = express.Router();

// Destructure and import Sequelize models related to media titles and user preferences:
// - Title: represents a movie/show entity
// - UserFavorites: join table/model to track which titles a user has marked as favorite
// - UserWatchLater: join table/model to track titles the user has saved to watch later
const { Title, UserFavorites, UserWatchLater } = require('../../models/Title');

// Import the User model, which represents a registered user in the system
const User = require('../../models/User');

// Import the UserActivity model, which may track user interactions like views, likes, or ratings
const UserActivity = require('../../models/UserActivity');

// Import JWT token verification middleware to secure routes
// Ensures only authenticated users can access certain routes (via Authorization header)
const { verifyToken } = require('../../utils/tokens');

router.get('/favorite/', verifyToken, (req, res) => {
    User.findOne({ where: { id: req.userId }, include: { model: Title, as: "favorite" } }).then(user => {
        res.send(user.favorite)
    }).catch(err => res.status(500).send(err))
})

router.get('/watchLater/', verifyToken, (req, res) => {
    User.findOne({ where: { id: req.userId }, include: { model: Title, as: "watchLater" } }).then(user => {
        res.send(user.watchLater)
    }).catch(err => res.status(500).send(err))
})

router.post('/favorite/:imdbId', verifyToken, (req, res) => {
    const { imdbId } = req.params
    User.findOne({ where: { id: req.userId }, include: { model: Title, as: "favorite" } }).then(user => {
        Title.findOne({ where: { imdbId } }).then(async title => {
            await user.addFavorite(title, { as: "favorite" })
            await UserActivity.create({
                userId: user.id,
                TitleId: title.id,
                activityType: "favorite"
            })
            res.send(user.favorite)
        }).catch(err => res.status(500).send(err))
    }).catch(err => res.status(500).send(err))
})

router.post('/watchlater/:imdbId', verifyToken, (req, res) => {
    const { imdbId } = req.params
    User.findOne({ where: { id: req.userId }, include: { model: Title, as: "watchLater" } }).then(user => {
        Title.findOne({ where: { imdbId } }).then(async title => {
            try {
                await user.addWatchLater(title, { as: "watchLater" })
                await UserActivity.create({
                    userId: user.id,
                    TitleId: title.id,
                    activityType: "watchLater"
                })
                res.send(user.watchLater)
            } catch (error) { res.status(500).send(error) }
        }).catch(err => res.status(500).send(err))
    }).catch(err => res.status(500).send(err))
})

router.delete('/favorite/:imdbId', verifyToken, async (req, res) => {
    const { imdbId } = req.params
    try {
        const title = await Title.findOne({ where: { imdbId } })
        const user = await User.findOne({ where: { id: req.userId } })
        await (await UserFavorites.findOne({ where: { UserId: req.userId, TitleId: title.id } })).destroy()
        const userActivity = await UserActivity.create({
            userId: user.id,
            TitleId: title.id,
            activityType: "removeFavorited"
        })
        res.send(userActivity)
    } catch (error) { res.status(500).send(error) }
})

router.delete('/watchlater/:imdbId', verifyToken, async (req, res) => {
    const { imdbId } = req.params
    try {
        const title = await Title.findOne({ where: { imdbId } })
        const user = await User.findOne({ where: { id: req.userId } })
        await (await UserWatchLater.findOne({ where: { UserId: req.userId, TitleId: title.id } })).destroy()
        const userActivity = await UserActivity.create({
            userId: user.id,
            TitleId: title.id,
            activityType: "removeWatchLater"
        })
        res.send(userActivity)
    } catch (error) { res.status(500).send(error) }
})


module.exports = router

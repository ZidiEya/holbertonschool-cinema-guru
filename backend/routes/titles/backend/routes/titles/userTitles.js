// Import the Express framework to set up routing
const express = require('express');

// Create a new router object to define and group related route handlers
const router = express.Router();

// Import Sequelize models related to Titles and user-specific title interactions
// - Title: Represents the media content (e.g., movies, shows)
// - UserFavorites: A join table or model tracking which titles a user marked as favorite
// - UserWatchLater: A join table or model tracking which titles a user wants to watch later
const { Title, UserFavorites, UserWatchLater } = require('../../models/Title');

// Import the User model which represents the application's users
const User = require('../../models/User');

// Import the UserActivity model, likely used to track user behavior or interactions with content
const UserActivity = require('../../models/UserActivity');

// Import middleware that verifies a JWT (JSON Web Token) to authenticate users
// This ensures protected routes are accessed only by authorized users
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

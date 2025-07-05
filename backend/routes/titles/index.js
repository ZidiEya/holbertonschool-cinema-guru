// Import the Express framework to create a new router
const express = require('express');

// Create a router object to define routes related to titles
const router = express.Router();

// Import the Title Sequelize model (likely represents movies, books, games, etc.)
const { Title } = require('../../models/Title');

// Import middleware to verify JSON Web Tokens (JWT) for authentication
const { verifyToken } = require('../../utils/tokens');

// Import Sequelize's 'Op' object, which provides operators like Op.like, Op.or, Op.gt, etc.
// Used for building complex queries (e.g., filtering, searching)
const { Op } = require('@sequelize/core');

// Import sub-router for user-specific title routes (e.g., favorites, watched list, etc.)
const userTitlesRouter = require('./userTitles');

// Import Axios to make HTTP requests to external APIs (e.g., movie database, external search)
const axios = require('axios');


router.use('/', userTitlesRouter)

router.get('/advancedsearch', verifyToken, async (req, res) => {
    const maxYear = parseInt(req.query.maxYear)
    const minYear = parseInt(req.query.maxYear)
    const genre = req.query.genres ? req.query.genres.split(',').map(genre => genre.charAt(0).toUpperCase() + genre.slice(1)) : []
    const params = {
        maxYear: isNaN(maxYear) ? 2022 : maxYear,
        minYear: isNaN(minYear) ? 0 : minYear,
        sort: req.query.sort ?? "",
        genres: genre,
        title: req.query.title ? req.query.title : "",
        page: req.query.page ? req.query.page : 1,
    }
    const titles = await Title.findAll({
        where: {
            released: {
                [Op.between]: [params.minYear, params.maxYear]
            },
            genres: {
                [Op.contains]: params.genres ? params.genres : true
            },
            title: {
                [Op.iLike]: `%${params.title}%`
            }
        },
        order: [getSort(params.sort)],
        limit: params.page * 50,
    }).catch(err => res.status(500).send(err))
    res.send({ totalCount: titles.length, titles })
})

router.get('/:imdbId', verifyToken, (req, res) => {
    const { imdbId } = req.params
    Title.findOne({ where: { imdbId } }).then(data => res.send(data)).catch(err => res.status(500).send(err))
})

const getSort = (param) => {
    switch (param) {
        case "oldest":
            return ['released', 'ASC']
        case "highestrated":
            return ['imdbrating', 'DESC']
        case "lowestrated":
            return ['imdbrating', 'ASC']
        default:
            return ['released', 'DESC']
    }
}

module.exports = router

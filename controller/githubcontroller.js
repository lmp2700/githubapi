const express = require('express');
const router = express.Router();
const axios = require('axios');

// INDEX PAGE
router.get('/', async (req, res) => {
    res.render('index.ejs')
})

// SHOW RESULTS FROM API SEARCH
router.get('/show', async (req, res) => {
    const query = req.query['query']
    const querySplit = query.split('/')
    const user = querySplit[1]
    const repos = querySplit[2]
    axios.get(`https://api.github.com/repos/${user}/${repos}/pulls`).then((response) => {
        headers = {
            "User-Agent": "lmp2700"
        }
        let pullResults = []
        const apiResponse = response;
        res.render('show.ejs', {
            apiResponse: apiResponse.data, // response from search
            openPulls: pullResults, // all pulls for user
            user: user, // username
            repos: repos // their repos
        })
    }).catch((error) => {
        res.render('error.ejs', {
            error: error
        })
    })
})


// SHOW DETAILS OF INDIVIDUAL PULL REQUEST
router.get('/details', async (req, res) => {
    const query = req.query['query']
    axios.get(`${query}`).then((response) => {
        queryResponse = response
        res.render('details.ejs', {
            queryResponse: queryReponse.data // individual pull
        })
    }).catch((error) => {
        res.render('error.ejs', {
            error: error
        })
    })
})

module.exports = router;
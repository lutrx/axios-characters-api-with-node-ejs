const router = require("express").Router();
const axios = require("axios");

/* GET characters list page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

//Get Create new character page

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character')
})


//Create a new character in the db and show all characters again
router.post('/characters/create', async (req, res, next) => {
    await axios.post('https://ih-crud-api.herokuapp.com/characters', req.body)
    res.redirect('/characters')
})

//Get details of a specific character
router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

//Get page to edit a specific character
router.get('/characters/:id/update', async (req, res, next) => {
    const dataCharacter = await axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    res.render('characters/edit-character', { character: dataCharacter.data })
})

//Create the update on a specific character and show the changed details of it
router.post('/characters/:id/update', async (req, res, next) => {
    await axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, req.body)
    res.redirect(`/characters/${req.params.id}`)
})

//Get delete page 
router.get('/characters/:id/delete', async (req, res, next) => {
    const detailsCharacter = await axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    res.render("characters/details-character", { character: detailsCharacter.data });
})

//Delete a character from the db and redirect to character list
router.post('/characters/:id/delete', async (req, res, next) => {
    await axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    res.redirect('/characters')
})






module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const express = require('express');
const router = express.Router();
const Place = require('../models/Place.model');

// GET => render the form to create a new place
router.get('/new', (req, res) => res.render('places/new'))

// POST => to create new place and save it to the DB
router.post('/new', (req, res) => {
	
    let location = {
		type: 'Point',
		coordinates: [req.body.latitude, req.body.longitude]
	}

	Place.create({
		name: req.body.name,
		type: req.body.type,
        location: location
	})
		.then(() => res.redirect("/places"))
		.catch(err => console.log(err))
});

// GET => to retrieve all the places from the DB
router.get('/places', (req, res) => {

	Place.find()
		.then(places => {
            console.log(places);
            res.render('index', { places })
        })
		.catch(err => console.log(err))
})

// GET => get the form pre-filled with the details of one place
router.get('/places/edit/:id', (req, res) => {

	Place.findById(req.params.id)
		.then(place => res.render('places/update', place))
		.catch(err => console.log(err))
})

// POST => save updates in the database
router.post('/places/:id', (req, res) => {
	const { name, type } = req.body

	Place.findByIdAndUpdate(req.params.id, { name, type })
		.then(() => res.redirect(`/places/${req.params.id}`))
		.catch(err => console.log(err))
});

// DELETE => remove the place from the DB
router.get('/places/delete/:id', (req, res) => {
	Place.findByIdAndRemove(req.params.id)
		.then(() => res.redirect('/places'))
		.catch(err => console.log(err))
});

//MAPS
router.get('/api/places', (req, res) => {
	Place.find()
		.then(places => {
			res.status(200).json({places});
		})
		.catch(err => console.log(err))
});

router.get('/api/places/:id', (req, res) => {
	let placeId = req.params.id;
	Place.findById(placeId)
		.then(place => res.status(200).json(place))
		.catch(err => console.log(err))
})

//GET => show details page
router.get('/places/:id', (req, res) => {

    Place.findById(req.params.id)
        .then(place => res.render('places/details', place))
        .catch(err => console.log(err))

})

module.exports = router;
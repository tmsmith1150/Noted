// const express = require('express');
// const router = express.Router();

// router.post('/', (req, res) => {
//     res.send('Creating a new note')
// })

// router
//     .route('/:id').get ((req, res) => {
//         res.send(`Getting your note, ${req.params.id}`)
//     }).put((req, res) => {
//         res.send('Editing your note')
//     }).delete((req, res) => {
//         res.send('Deleting your note')
//     })

// const notes = [{}]
// router.param('id', (req, res, next, id) => {
//     req.note = notes[id]
//     next()
// })

// module.exports = router;
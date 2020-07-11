const express = require('express');

const Users = require('./Users-model');

const router = express.Router();

router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            
            // hide user passwords
            const safeUsers = users.map(user => {
                return {...user, password: undefined}
            });

            res.status(200).json(safeUsers);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        });
});

module.exports = router;
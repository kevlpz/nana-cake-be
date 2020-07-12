const express = require('express');
const bcrypt = require('bcrypt');

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

// register new user
router.post('/', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {username, password: hashedPassword}

    if(username && password){
        Users.add(newUser)
        .then(user => res.status(201).json({...user, password: undefined}))
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        })
    } else {
        res.status(400).json({error: 'Must include username and password'});
    }
});

module.exports = router;
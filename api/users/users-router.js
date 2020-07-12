const express = require('express');
const bcrypt = require('bcrypt');

const Users = require('./Users-model');

const router = express.Router();


const authenticate = (req, res, next) => {
    console.log('authenticate');
    if(req.session.user && req.session.user.admin) {
        console.log(req.session.user);
        console.log(req.session.user.admin);
        next();
    } else {
        res.status(401).json({error: 'User not authorized'});
    }
}

router.get('/', authenticate, (req, res) => {
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
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {username, password: hashedPassword}

    if(username && password){
        Users.add(newUser)
        .then(user => {
            req.session.user = user;
            res.status(201).json({...user, password: undefined});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        })
    } else {
        res.status(400).json({error: 'Must include username and password'});
    }
});

// login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(username && password) {
        Users.getByUsername(username)
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)) {
                    req.session.user = user;
                    res.status(200).json({...user, password: undefined});
                } else {
                    res.status(400).json({error: 'Incorrect username or password'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Internal server error'});
            });
    } else {
        res.status(401).json({error: 'Must include username and password'});
    }
});

module.exports = router;
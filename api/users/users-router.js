const express = require('express');
const bcrypt = require('bcrypt');

const Users = require('./Users-model');
const { authenticate, authAdmin } = require('./authenticate');
const passport = require('passport');

const router = express.Router();


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
router.post('/login', passport.authenticate('local'), (req, res) => {
    if(req.user) {
        res.status(200).json({...req.user, password: undefined});
    } else {
        res.status(401).json({error: 'Invalid username or password'});
    }
});

// logout
router.get('/logout', (req, res) => {
    console.log(req.user);
    if(req.user) {
        req.logout();
        res.status(200).json({message: 'Successfully logged out'});
    } else {
        res.status(200).json({message: 'Already logged out'});
    }
})

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Users.getById(id);
        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server issue'});
    }
})

// Change Password
router.put('/:id', authAdmin, async (req, res) => {
    const { id } = req.params;
    const { oldPass, newPass, confirmPass } = req.body;
    console.log('hit change route');

    if(newPass === confirmPass) {
        console.log('after if');
        try {
            const user = await Users.getById(id);
            const isMatch = await bcrypt.compare(oldPass, user.password);
            if(isMatch) {
                console.log('after isMatch');
                Users.changePassword(id, newPassword)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        } catch {
            res.status(500).json({error: 'Internal server error'});
        }
    } else {
        res.status(401).json({error: 'Incorrect username or password'});
    }
});

module.exports = router;
const Users = require('./api/users/users-model');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, Users) {
    const authenticateUser = async (username, password, done) => {
        const user = await Users.getByUsername(username);
        if(!user) {
            return done(null, false);
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false)
            }
        } catch(err) {
            throw err;
        }
    }

    passport.use(new LocalStrategy(authenticateUser))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            done(null, await Users.getById(id))
        } catch(err) {
            done(err);
        }
    })
}
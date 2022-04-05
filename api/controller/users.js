const User = require('../models/user');

module.exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = new User({ username });
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.status(200).send("Successfully registered!")
        })
    } catch (e) {
        res.status(400).send(e.message);
    }
}

module.exports.login = (req, res) => {
    res.status(200).send("Successfully logged in!")
}

module.exports.logout = (req, res) => {
    req.logout();
    res.status(200).send("Successfully logged out!")
}

module.exports.check = (req, res) => {
    if (req.user) {
        console.log("User: " + req.user.username + " is logged in")
        res.status(200).end()
    } else {
        console.log("No user is currently logged in")
        res.status(201).end()
    }
}
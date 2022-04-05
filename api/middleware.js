const Backlog = require("./models/backlog");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(400).send("You must be logged in to do that")
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const backlog = await Backlog.findById(id);
    if (backlog) {
        if (!backlog.owner.equals(req.user._id)) {
            return res.status(401).send("You do not have permission to do that!");
        }
    }
    next();
}

module.exports.isItemOwner = async (req, res, next) => {
    const { bid, iid } = req.params;
    const backlog = await Backlog.findById(bid);
    if (backlog) {
        if (!backlog.owner.equals(req.user._id)) {
            return res.status(401).send("You do not have permission to do that!");
        }
    }
    next();
}
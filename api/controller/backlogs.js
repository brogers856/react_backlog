const Backlog = require('../models/backlog');
const axios = require('axios')

function parseBody(body) {
    console.log(body.genres)
    console.log(body.platforms)
    console.log(body.dev)
    body.genres = JSON.parse(body.genres)
    body.platforms = JSON.parse(body.platforms)
    body.dev = JSON.parse(body.dev)
    return body;
}

async function apiAdd(query) {
    let response = await axios.get(`https://www.giantbomb.com/api/game/${query}/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json`)
    let data = response.data.results
    const body = {
        title: data.name,
        dev: data.developers ? data.developers.map(a => a.name) : [],
        date: data.original_release_date,
        genres: data.genres ? data.genres.map(a => a.name) : [],
        platforms: data.platforms ? data.platforms.map(a => a.name) : [],
        desc: data.deck,
        image: data.image.medium_url,
        imageThumb: data.image.thumb_url
    }
    return body;
}

module.exports.index = async (req, res) => {
    const backlogs = await Backlog.find({ owner: req.user._id});
    res.status(200).send(backlogs)
}

module.exports.getBacklogs = async (req, res) => {
    const { id } = req.params;
    const backlog = await Backlog.find({ _id: id })
    res.send(backlog[0])
}

module.exports.createBacklog = async (req, res) => {
    const backlog = await Backlog.addBacklog(req);
    res.status(200).send(backlog).end();
}

module.exports.deleteBacklog = async (req, res) => {
    const { id } = req.params
    await Backlog.deleteOne({ _id: id })
    console.log(req.sessionID)
    res.status(200).send(req.sessionID);
}

module.exports.editBacklog = async (req, res) => {
    const { id } = req.params
    const { name } = req.body;
    const data = await Backlog.findOneAndUpdate({ _id: id }, { name: name }, { returnOriginal: false })
    res.status(200).send(data).end();
}

module.exports.addItem = async (req, res) => {
    const { id } = req.params;
    let body = req.body
    if (req.query.type === 'manual') {
        body = parseBody(body);
        body.image = req.file.path.replace('/upload', '/upload/h_285/w_360');
        body.imageThumb = req.file.path.replace('/upload', '/upload/h_90/w_120');
    } 
    else if (req.query.type === 'api') body = await apiAdd(req.body.query);
    const backlog = await Backlog.find({ _id: id })
    const item = await backlog[0].addItem(body)
    res.status(200).end();
 }

module.exports.editItems = async (req, res) => {
    const { id } = req.params;
    await Backlog.findByIdAndUpdate(id, { items: req.body }, { runValidators: true, useFindAndModify: false })
    res.end();
}

module.exports.editItem = async (req, res) => {
    const { bid, iid } = req.params;
    let body = parseBody(req.body);
    const backlog = await Backlog.findById(bid);
    const items = backlog.items;
    const item = items.id(iid);
    if (req.file == null) {
        req.body.image = item.image;
        req.body.imageThumb = item.imageThumb;
    } else {
        body.image = req.file.path.replace('/upload', '/upload/h_285/w_360');
        body.imageThumb = req.file.path.replace('/upload', '/upload/h_90/w_120');
    }
    items[items.indexOf(item)] = body;
    await Backlog.findByIdAndUpdate(bid, { items: items }, { runValidators: true, useFindAndModify: false })
    res.status(200).end();
}

module.exports.deleteItem = async (req, res) => {
    const { bid, iid } = req.params
    const backlog = await Backlog.find({ _id: bid });
    await backlog[0].deleteItem(iid);
    res.end();
}
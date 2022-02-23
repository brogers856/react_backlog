const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dev: [String],
    date: String,
    genres: [String],
    platforms: [String],
    desc: String,
    image: String,
    imageThumb: String
})

itemSchema.virtual('thumbnail').get(function () {
    return this.image.replace('/upload', '/upload/h_90/w_120')
})

const backlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: {
        type: [itemSchema],
        required: true
    }
})

backlogSchema.methods.deleteItem = function (i_id) {
    this.items.pull(i_id);
    this.save();
}

backlogSchema.methods.addItem = async function (itemSchema) {
    this.items.push(itemSchema);
    await this.save();
    return this.items[this.items.length - 1]
}

backlogSchema.statics.addBacklog = async function (data) {
    const newBacklog = new Backlog(data);
    await newBacklog.save();
    return newBacklog;
}

const Backlog = mongoose.model('Backlog', backlogSchema);

module.exports = Backlog;
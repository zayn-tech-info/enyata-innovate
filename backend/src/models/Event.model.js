const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    // Event fields
});

module.exports = mongoose.model('Event', EventSchema);

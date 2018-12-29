var mongoose = require('mongoose');

var creditSchema = new mongoose.Schema({
    project_id: String,
    total: Number
});

creditSchema.methods.cleanup = function() {
    return {project_id: this.project_id, total: this.total};
}

var Credit = mongoose.model('Credit', creditSchema);

module.exports = Credit;
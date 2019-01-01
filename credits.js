var mongoose = require('mongoose');

var creditSchema = new mongoose.Schema({
    projectId: String,
    created: Date,
    income: Number,
    personnelExpenses: Number,
    executionExpenses: Number,
    total: Number
});

creditSchema.methods.cleanup = function() {
    return {
        // TODO: return id, not _id
        _id: this._id,
        projectId: this.projectId,
        created: this.created,
        personnelExpenses: this.personnelExpenses,
        executionExpenses: this.executionExpenses,
        income: this.income,
        total: this.total
    };
}

var Credit = mongoose.model('Credit', creditSchema);

module.exports = Credit;
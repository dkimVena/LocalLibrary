var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var BookInstanceSchema = Schema({
	book: {type: Schema.ObjectId, ref: 'Book', required: true},
	imprint: {type: String, required: true},
	status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
	due_back: {type: Date, default: Date.now},
});

//virtual for book instance URL
BookInstanceSchema
.virtual('url')
.get (function() {
	return '/catalog/bookinstance/' + this._id;
});

//virtual for due back format
BookInstanceSchema
.virtual('due_back_formatted')
.get(function() {
	return moment(this.due_back).format('MMMM Do, YYYY')
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);

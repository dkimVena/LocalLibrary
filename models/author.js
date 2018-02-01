var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var AuthorSchema = Schema(
	{
		first_name : {type: String, required: true, max: 100},
		family_name : {type: String, required: true, max: 100},
		date_of_birth : {type: Date},
		date_of_death : {type: Date},
	}
);

//virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
	return this.family_name + ', ' + this.first_name;
});

//virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
	return '/catalog/author/' + this._id;
});

//virtual for author's date
AuthorSchema
.virtual('author_life')
.get(function () {
	return (this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '' ) + ' ~ ' + (this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '');
});

//export model
module.exports = mongoose.model('Author', AuthorSchema);

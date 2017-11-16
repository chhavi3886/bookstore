var mongoose = require('mongoose');

// Genre Schema
var bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	author:{
		type: String
	},
	publisher:{
		type: String
	},
	url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBook = function(callback, limit) {
	// body...
	Book.find(callback).limit(limit);
}

// Get Book by id
module.exports.getBookById = function(id,callback) {
	// body...
	Book.findById(id,callback);
}

// add Book
module.exports.addBook = function(book,callback) {
	Book.create(book,callback);
}

//update book
module.exports.updateBook = function(id, book, options, callback) {
	var query = {_id: id};
	var set = {};
	if(book.title != undefined){
		set['title'] = book.title;
	}
	if(book.genre != undefined){
		set['genre'] = book.genre;
	}
	if(book.description != undefined){
		set['description'] = book.description;
	}
	if(book.author != undefined){
		set['author'] = book.author;
	}
	if(book.publisher != undefined){
		set['publisher'] = book.publisher;
	}
	if(book.description != undefined){
		set['url'] = book.url;
	}
	/*{
			title: book.title,
			genre: book.genre,
			description: book.description,
			author: book.author,
			publisher: book.publishers,
			url: book.url
		}*/
	var update = {
		$set: set
	};
	//console.log(update);
	Book.findOneAndUpdate(query, update, options, callback);
}
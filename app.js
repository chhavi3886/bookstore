var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyparser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/',function(req, res){
	res.send('please use /api/book or /api/genre');
});

app.get('/api/genre',function(req,res){
	Genre.getGenre(function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.post('/api/genre',function(req,res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/genre/:_id',function(req,res){
	var id = req.params._id;
	var genre = req.body;
	//res.json(genre);
	Genre.updateGenre(id,genre,{}, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/book/:_id',function(req,res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/book',function(req,res){
	var book = req.body;
	Book.addBook(book,  function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.get('/api/book',function(req,res){
	Book.getBook(function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.get('/api/book/:_id',function(req,res){
	Book.getBookById(req.params._id,function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('running on port 3000...');
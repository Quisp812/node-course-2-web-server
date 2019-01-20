/* server.js */

const express = require('express');						// require - add in express library
const hbs = require('hbs');								// require handlebars view template engine
const fs = require('fs');									// add the file system module from node

const port = process.env.PORT || 3000;		// get the port variable set by Heroko for web deployment, or use port 3000 if running locally

var app = express();									// Our app
hbs.registerPartials(__dirname + '/views/partials')									// enable partials
app.set('view engine', 'hbs');							// specify to set handlebars (hbs) and view template engine


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	console.log(log);
	next();
});

/*
// MAINTENANCE MODE
app.use((req, res, next) => {
	res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));			// use middleware function to serve static HTML pages from /public


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});									// register a handlebars helper

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})



// Serve ROOT
app.get('/', (req, res) => {							// req = request data, res = response
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome to my website'
	});
}); // end app.get ROOT

// serve Projects
app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects'
	});
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
}); // end app.get /about


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
}); // end app.get /bad


app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});										// listen on localhost port 3000

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const jwt = require( 'jsonwebtoken' );
const cors = require( 'cors' );
const app = express();
const port = 3001;

// Replace this with your own secret key for JWT
const secretKey = 'your-secret-key';

// Sample user data (in-memory database)
const users = [
	{ id: 1, username: 'user1', password: 'password1' },
	{ id: 2, username: 'user2', password: 'password2' },
];

app.use( bodyParser.json() );
app.use( cors() );

app.post( '/api/register', ( req, res ) => {
	const { username, password } = req.body;
	// Add validation logic here (e.g., check if username is unique)
	// In a real app, store user data securely (e.g., in a database)
	users.push( { id: users.length + 1, username, password } );
	users.forEach( element => {
		console.log( element );
	} );
	res.json( { message: 'Registration successful' } );
} );

app.post( '/api/login', ( req, res ) => {
	const { username, password } = req.body;
	// Add validation logic here (e.g., check credentials against stored data)
	const user = users.find( ( u ) => u.username === username && u.password === password );
	if ( !user ) {
		res.status( 401 ).json( { message: 'Invalid credentials' } );
	} else {
		const token = jwt.sign( { userId: user.id }, secretKey );
		console.log( token );
		res.json( { message: 'Login successful', token } );
	}
} );

app.listen( port, () => {
	console.log( `Server is running on port ${ port }` );
} );

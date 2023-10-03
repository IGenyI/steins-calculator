const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const jwt = require( 'jsonwebtoken' );
const cors = require( 'cors' );
const { z } = require( 'zod' );
const bcrypt = require( 'bcrypt' );
const app = express();
const port = 3001;

// Replace this with your own secret key for JWT
const secretKey = 'your-secret-key';
 
// Sample user data (in-memory database)
const users = [
	{ id: 1, username: 'Felipe', password: '$2b$10$WLnzB59fKZn5Q2c3DOQqDuQ57APKSU3xgilUnw68/jHpGcdy6PxPi' },//password1
	{ id: 2, username: 'Ariel', password: '$2b$10$2HLF5yvDPbwGFDbuIILUme0y6kCVM1y8Urq6oNmCOQSbzrynflAEC' },//password2
];

app.use( bodyParser.json() );
app.use( cors() );

// Define Zod schemas for request data
const registrationSchema = z.object( {
	username: z.string().min( 3 ), // Add your validation rules here
	password: z.string().min( 6 ), // Add your validation rules here
} );

const loginSchema = z.object( {
	username: z.string(),
	password: z.string(),
} );

app.post( '/api/register', async ( req, res ) => {
	try {
		var { username, password } = registrationSchema.parse( req.body ); // Validate using Zod
		// Add validation logic here (e.g., check if username is unique)
		// In a real app, store user data securely (e.g., in a database)
		password = await bcrypt.hash( password, 10 );
		users.push( { id: users.length + 1, username, password } );
		users.forEach( ( element ) => {
			console.log( element );
		} );
		res.json( { message: 'Registration successful' } );
	} catch ( error ) {
		res.status( 400 ).json( { error: error.message } ); // Send validation error response
	}
} );

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    // Add validation logic here (e.g., check credentials against stored data)
    async function comparePassword(password, hashedPasswordFromDatabase) {
      const value = await bcrypt.compare(password, hashedPasswordFromDatabase);
      return value;
    }

    // Find the user that matches the provided username and password
    let user = null;
    for (const u of users) {
      const compareHash = await comparePassword(password, u.password);
      if (u.username === username && compareHash) {
        user = u;
        break; // Exit the loop once a matching user is found
      }
    }

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user.id }, secretKey);

      console.log(token);
      res.json({ message: 'Login successful', token });
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send validation error response
  }
});


app.listen( port, () => {
	console.log( `Server is running on port ${ port }` );
} );

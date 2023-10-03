import React, { useState } from 'react';
import { Route, Routes, Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import z from 'zod';


const loginSchema = z.object( {
	username: z.string(),
	password: z.string().min( 6 ) 
} );

const registerSchema = z.object( {
	username: z.string(),
	password: z.string().min( 8 )
} );


function App () {
	const [ token, setToken ] = useState( '' );
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState('');
	const [registerError, setRegisterError] = useState('');


	// Replace with your backend API URL
	const apiUrl = 'http://localhost:3001/api'; 

	const handleRegister = async ( username, password ) => {
		const formData = { username, password };
		registerSchema.parse( formData );
		try {
			const response = await fetch( `${ apiUrl }/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify( { username, password } ),
			} );
			const data = await response.json();
			if (!response.ok) {
				setRegisterError(data.message); // Set the error message
			} else {
				setRegisterError(''); // Clear any previous error message
				console.log(data.message);
			}
		} catch ( error ) {
			console.error( 'Error:', error );
		}
	};

	const handleLogin = async ( username, password ) => {
		const formData = { username, password };
		loginSchema.parse( formData );
		try {
			const response = await fetch( `${ apiUrl }/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify( { username, password } ),
			} );
			const data = await response.json();
			if (!response.ok) {
				setLoginError(data.message); 
			} else {
				setLoginError(''); 
				console.log(data.token);
				setToken(data.token);
				navigate('/private/application');
			}
		} catch ( error ) {
			console.error( 'Error:', error );
		}
	};

	return (
		<div className="App">
			<h1>Authentication</h1>
			<nav>
				<ul>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/login" element={ <Login onLogin={ handleLogin } loginError={loginError} /> } />
				<Route path="/register" element={ <Register onRegister={ handleRegister } registerError={registerError} /> } />
				<Route path="/private" element={ <PrivateRoute token={ token } /> } >
					<Route path='application' element={ <Application /> } />
				</Route>
				<Route index element={ <Navigate to="/login" /> } />
			</Routes>
		</div>
	);
}


function Login ( { onLogin, loginError } ) {
	const [ username, setUsername ] = useState( '' );
	const [ password, setPassword ] = useState( '' );

	const handleSubmit = ( e ) => {
		e.preventDefault();
		onLogin( username, password );
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={ handleSubmit }>
				<input
					type="text"
					placeholder="Username"
					value={ username }
					onChange={ ( e ) => setUsername( e.target.value ) }
				/>
				<input
					type="password"
					placeholder="Password"
					value={ password }
					onChange={ ( e ) => setPassword( e.target.value ) }
				/>

				{loginError && <div className="error">{loginError}</div>}
				
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

function Register ( { onRegister, registerError } ) {
	const [ username, setUsername ] = useState( '' );
	const [ password, setPassword ] = useState( '' );

	const handleSubmit = ( e ) => {
		e.preventDefault();
		onRegister( username, password );
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={ handleSubmit }>
				<input
					type="text"
					placeholder="Username"
					value={ username }
					onChange={ ( e ) => setUsername( e.target.value ) }
				/>
				<input
					type="password"
					placeholder="Password"
					value={ password }
					onChange={ ( e ) => setPassword( e.target.value ) }
				/>
				 {registerError && <div className="error">{registerError}</div>}
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

function PrivateRoute ( { token } ) {
	return token ? <Outlet /> : <Navigate to="/login" />;
}

function Application () {
	return (
		<div>
			<h1>Application</h1>
			<p>This is a private route.</p>
		</div>
	);
}

export default App;

import React, { useState } from 'react';
import Input from './Input';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement login logic here
        console.log(email);
        console.log(password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>

                <Input
                    label="E-mail:"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    text=""
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                    label="Senha:"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    text=""
                    onChange={(e) => setPassword(e.target.value)}
                ></Input>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

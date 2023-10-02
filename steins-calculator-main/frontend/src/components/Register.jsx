import React, { useState } from 'react';
import Input from './Input';
import { validateConfirmPassword, validatePassword } from '../functions/Validate'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);

        if (!validatePassword(password)) {
            setPasswordError('A senha deve ter pelo menos 8 caracteres e conter pelo menos um número.');
            return;
        } else {
            setPasswordError('');
        }

        // Validação da confirmação da senha
        if (!validateConfirmPassword(password, confirmPassword)) {
            setConfirmPasswordError('A confirmação da senha não coincide com a senha digitada.');
            return;
        } else {
            setConfirmPasswordError('');
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
                    text={passwordError ? passwordError : ''}
                    onChange={(e) => setPassword(e.target.value)}
                ></Input>
                
                <Input
                    label="Confirme a Senha:"
                    type="password"
                    name="confirmPassword"
                    placeholder="Digite sua senha novamente"
                    text={confirmPasswordError ? confirmPasswordError : ''}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>



                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;

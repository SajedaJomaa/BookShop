import { json, redirect } from 'react-router-dom';

import Signup from '../components/Authentication/Signup.js';

export default function SignupAuthPage() {
    return <Signup />;
}



export async function signupAction({ request }) {
    const mode = 'signup';

    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    };
    console.log('Auth Data:', authData);

    const response = await fetch('http://localhost:8080/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/');
}
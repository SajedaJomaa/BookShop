import { redirect } from 'react-router-dom';

export function getTokenDuration() {
    let storedExpirationDate;

    try {
        storedExpirationDate = localStorage.getItem('expiration');
    } catch (error) {
        storedExpirationDate = null;
        return `Error retrieving expiration date from localStorage${error}`;

    }
    if (storedExpirationDate) {
        const expirationDate = new Date(storedExpirationDate);
        const now = new Date();
        const duration = expirationDate.getTime() - now.getTime();
        return duration;
    } else {
        return null;
    }
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}

export function tokenLoader() {
    const token = getAuthToken();
    return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }
}
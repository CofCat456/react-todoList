export const apiUrl = 'https://todoo.5xcamp.us';

export const Api_signIn = `${apiUrl}/users/sign_in`;

export const Api_register = `${apiUrl}/users`;

export const Api_Todo = `${apiUrl}/todos`;

export const setUserData = (data) =>
    localStorage.setItem('user', JSON.stringify(data));

export const getUserData = () => JSON.parse(localStorage.getItem('user'));

export const getAuthToken = () => getUserData().authorization;

export const clearUserData = () => localStorage.clear();

import {
    Api_signIn,
    Api_register,
    Api_Todo,
    getAuthToken,
} from './constants.js';

export const LoginApi = (user) => {
    return fetch(Api_signIn, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
    });
};

export const RegisterApi = (user) => {
    return fetch(Api_register, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
    });
};

export const GetTodosApi = () => {
    return fetch(Api_Todo, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: getAuthToken(),
        },
    });
};

export const AddTodoApi = (todo) => {
    return fetch(Api_Todo, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: getAuthToken(),
        },
        body: JSON.stringify({ todo }),
    });
};

export const deleteTodoApi = (id) => {
    return fetch(`${Api_Todo}/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: getAuthToken(),
        },
    });
};

export const toggleTodoApi = (id) => {
    return fetch(`${Api_Todo}/${id}/toggle`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            Authorization: getAuthToken(),
        },
    });
};

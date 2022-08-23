import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './pages/Home';
import Login from './pages/Home/components/Login';
import Register from './pages/Home/components/Register';
import Todo from './pages/Todo/index';

import { Routes, Route, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <HashRouter>
            <Routes>
                <Route element={<Home />}>
                    <Route path='/' element={<Login />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
                <Route path='todo' element={<Todo />} />
            </Routes>
        </HashRouter>
    </>
);

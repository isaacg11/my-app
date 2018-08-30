import React from 'react';
import axios from 'axios';
import { createStore } from 'redux';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'username':
            return { ...state, username: action.payload };
        case 'password':
            return { ...state, password: action.payload };
        default:
            return state;
    }
}

const store = createStore(reducer);

function register() {
    let userInfo = store.getState();
    axios.post('/api/users/signup', userInfo).then((res) => {
        localStorage.setItem('token', res.data.token) 
        window.location.href = '/products';
    }).catch((err) => {
        alert('there was an error')
    })
}

const Register = () => (
    <div>
        <h1>Register</h1>
        <input type="text" placeholder="username" onChange={(e) => store.dispatch({type: 'username', payload: e.target.value})} />
        <input type="password" placeholder="password" onChange={(e) => store.dispatch({type: 'password', payload: e.target.value})} />
        <button onClick={() => register()}>submit</button>
        <div>
            <a href="/login">Login</a>
        </div>
    </div>
)

export default Register;
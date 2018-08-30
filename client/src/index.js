import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../src/screens/Register';
import Login from '../src/screens/Login';
import Products from '../src/screens/Products';
import Details from '../src/screens/Details';
import Admin from '../src/screens/Admin';
import Tracking from '../src/screens/Tracking';

const Index = ({ pathname }) => {
    switch(pathname) {
        case '/':
            return <Register />
        case '/login':
            return <Login />
        case '/products':
            return <Products />
        case '/details':
            return <Details />
        case '/admin':
            return <Admin />
        case '/tracking':
            return <Tracking />
        default:
            return <Register />
    }
}

let pathname = window.location.pathname;

ReactDOM.render(
    <div>
        <Index pathname={pathname} />
    </div>,
    document.getElementById('root')
)

window.addEventListener('popstate', () => {
    pathname = window.location.pathname;
})
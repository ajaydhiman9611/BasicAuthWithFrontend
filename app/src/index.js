import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const root = ReactDOM.createRoot(document.getElementById('root'));

axios.interceptors.request.use(
  (req) => {
    if(req.url.includes("login") || req.url.includes("register_w")) return req;
    
    let at = cookies.get('at', { path: "/", domain:"localhost"})
    console.log("at in req interceptors :: ", at)
    
    if(req.method === "POST"){
      req.body.at = at ? at : ""
    } else {
      req.headers.Authentication = at ? at : ""
    }
    return req;
  },
  (err) => {
    console.log("Error from req interceptors!");
    return Promise.reject(err);
  }
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Register from './components/Register';
import Login from './components/Login';
import Update from './components/Update';
import Home from './components/Home';
import App1 from './components/App1';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App/> */}
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='home/:email' element={<Home/>}/>
          <Route path='/gambar/:id' element={<App1/>}/>
          <Route path='/update/:id' element={<Update/>}/>
          <Route path="data" element={<App/>} />
          {/* <Route path="/home" element={<Home/>} /> */}
          <Route path="register" element={<Register/>} />
          <Route path="*" element={<Login/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import './App.css';
import React from 'react'
import NavbarComponent from './components/navbar/navbar';
import {NavLink,Route,Switch,BrowserRouter } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
     
       <NavbarComponent/>
       
             </header>
    </div>
  );
}

export default App;

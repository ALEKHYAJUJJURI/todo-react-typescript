import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDoIndex } from './compo/todo-index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ToDoIndex/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDoIndex } from './compo/todo-index';
import { UserRegister } from './compo/register';
import { UserLogin } from './compo/login';
import { Dashbosrd } from './compo/dashboard';
import { AddAppointments } from './compo/add-appointments';
import { UserDashboard } from './compo/user-dashboard';
import { EditAppointment } from './compo/edit-appointment';
import { DeleteAppointment } from './compo/delete-appointment';

function App() {
  return (
    <div className="App bg-con">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ToDoIndex/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/dashboard' element={<Dashbosrd/>}/>
        <Route path='/add-appointment' element={<AddAppointments/>}/>
        <Route path='/user-dashboard' element={<UserDashboard/>} />
        <Route path='/edit-appointment/:id' element={<EditAppointment/>}/>
        <Route path='/delete-appointment/:id' element={<DeleteAppointment/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

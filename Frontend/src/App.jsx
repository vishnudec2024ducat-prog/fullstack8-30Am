import React, { useEffect } from 'react'
import Counter from './components/Counter';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import ModalForm from './AdminPannel/ModalForm';
import { useDispatch } from 'react-redux';
import { isCurrentUser } from './utility/UserSlice';

const App = () => {
 const dispatch =  useDispatch()
  useEffect(()=>{
    dispatch(isCurrentUser());
  },[])
  return (
    <div className="container">
      <ModalForm/>
      <Navbar/>
      <Outlet/>
      
    </div>
  );
}

export default App
import React from 'react';
import { Outlet} from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';



function App() {
  return (
    <>
      <NavBar />
      <div className="App">
      
      <Outlet/>
      </div>
    </>

  );
}

export default App;

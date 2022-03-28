import React from 'react';
import { Outlet} from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

import Home from './pages/Home';

function App() {
  return (
    <>
      <div className="App">
       <Home/>
      </div>
      <Footer/>
    </>

  );
}

export default App;

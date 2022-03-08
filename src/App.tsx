import React from 'react';
import './App.css';
import ItemJogo from './components/ItemJogo';
import NavBar from './components/NavBar';


function App() {
  return (
    <>
      <NavBar />
      <div className="App">
       
     <ItemJogo nomeJogo='Nome do Jogo' anoJogo={2019} id={1}/>
        

      </div>
    </>

  );
}

export default App;

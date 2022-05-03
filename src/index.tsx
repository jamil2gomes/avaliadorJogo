import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Rotas from 'routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <Rotas/>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


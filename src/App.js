// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BackOffice from './BackOffice';
import Menu from './Menu';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuHash from './MenuHash';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/hash" element={<MenuHash />} />
          <Route path="/backoffice" element={<BackOffice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

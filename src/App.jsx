import React from 'react';
import { useState } from 'react';
import './App.css';
import Form from './components/form';
import Flights from './components/flights';



function App() {

  const [formInfo, setFormInfo] = useState({});
  const [airCompanies, setAirCompanies] = useState("");

  return (
    <div className="App">
      <Form setData={setFormInfo} airCompanies={airCompanies} />
      <Flights formInfo={formInfo} setAirCompanies={setAirCompanies} />
    </div>
  );
}

export default App;

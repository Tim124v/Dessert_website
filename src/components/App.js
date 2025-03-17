import React, { useState } from 'react';
import './App.css';
import CakeList from './components/CakeList';
import OrderForm from './components/OrderForm';
import Header from './components/Header';

function App() {
  const [selectedCake, setSelectedCake] = useState(null);

  return (
    <div className="app">
      <Header />
      <main>
        <CakeList onSelectCake={setSelectedCake} />
        {selectedCake && <OrderForm cake={selectedCake} />}
      </main>
    </div>
  );
}

export default App; 
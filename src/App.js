import './App.css';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';

function App() {
  const [billings, setBillings] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/billing-list')
      .then(res => res.json())
      .then(data => setBillings(data))
  }, [])
  return (
    <div className="App">
      <Home billings={billings} setBillings={setBillings}></Home>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import First from './components/First';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import Page6 from './components/Page6';
import Page7 from './components/Page7';
import Page8 from './components/Page8';
import Last from './components/Last';
import { TimerProvider } from './components/TimerContext';
// import Modal from './components/Modal';
import './App.css';

function App() {
  
  return (
    
    <Router>
      <TimerProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/Page1" element={<Page1 />} />
          <Route path="/Page2" element={<Page2 />} />
          <Route path="/Page3" element={<Page3 />} />
          <Route path="/Page4" element={<Page4 />} />
          <Route path="/Page5" element={<Page5 />} />
          <Route path="/Page6" element={<Page6 />} />
          <Route path="/Page7" element={<Page7 />} />
          <Route path="/Page8" element={<Page8 />} />
          <Route path="/Last" element={<Last />} />
        </Routes>
      </div>
      </TimerProvider>
    </Router>
    
  );
}

export default App;

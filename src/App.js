

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

import Page21 from './components/Page21';
import Page22 from './components/Page22';
import Page23 from './components/Page23';
import Page24 from './components/Page24';
import Page25 from './components/Page25';
import Page26 from './components/Page26';
import Last2 from './components/Last2';
import { TimerProvider } from './components/TimerContext';

import './App.css';

function App() {
  return (
    <Router basename="/games/animal_farm">
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
            <Route path="/Page21" element={<Page21 />} />
            <Route path="/Page22" element={<Page22 />} />
            <Route path="/Page23" element={<Page23 />} />
            <Route path="/Page24" element={<Page24 />} />
            <Route path="/Page25" element={<Page25 />} />
            <Route path="/Page26" element={<Page26 />} />
            <Route path="/Last2" element={<Last2 />} />
          </Routes>
        </div>
      </TimerProvider>
    </Router>
  );
}

export default App;

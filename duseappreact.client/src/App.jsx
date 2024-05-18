import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import CollegePage from './pages/SearchPage/SearchPage.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import AuthPanel from './components/AuthPanel/AuthPanel.jsx';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<Home />}/>
        <Route path="/college" element={<CollegePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
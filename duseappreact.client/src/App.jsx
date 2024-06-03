import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
//
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
//
import FavoritePage from './pages/FavoriePage/FavoritePage.jsx';
import CollegePage from './pages/CollegePage/CollegePage.jsx';
import Home from './pages/Home/Home.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';

const App = observer(() => {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<Home />}/>
        <Route path="/college" element={<SearchPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/collegePage" element={<CollegePage/>} />
      </Routes>
      <Footer />
    </Router>
  );
});

export default App;
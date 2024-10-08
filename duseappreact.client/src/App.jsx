import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
//
import Header from './pages/wrapper/header/header.jsx';
import Footer from './pages/wrapper/footer/footer.jsx';
//
import FavoritePage from './pages/FavoriePage/FavoritePage.jsx';
import CollegePage from './pages/CollegePage/CollegePage.jsx';
import HomePage from './pages/home/homePage.jsx';
// import HomePage from './pages/HomePage/HomePage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import TestPage from './pages/testPreview/testPreview.jsx'; 
import GuidePage from './pages/GuidePage/GuidePage.jsx';

const App = observer(() => {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<HomePage />}/>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/page" element={<CollegePage/>} />
        <Route path="/testPreview" element={<TestPage/>} />
        <Route path="/test" element={<TestPage/>} />
        <Route path="/guide" element={<GuidePage/>} />
      </Routes>
      <Footer />
    </Router>
  );
});

export default App;
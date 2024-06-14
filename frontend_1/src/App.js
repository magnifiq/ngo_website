import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import News from './pages/News/News';
import NewsDetail from './pages/News/NewsDetail';
import Admin from './pages/Admin/Admin';
import Main from './pages/Main/Main';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminFormContent from "./components/AdminForm/AdminFormContent/AdminFormContent";


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/news"
            element={<AdminFormContent contentType="news" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import News from "./pages/News/News";
import NewsDetail from "./pages/News/NewsDetail";
import Admin from "./pages/Admin/Admin";
import Main from "./pages/Main/Main";
import Gallery from "./pages/Gallery/Gallery";
import AboutUs from "./pages/AboutUs/AboutUs";
import GalleryFormPage from "./pages/GalleryForm/GalleryFormPage";
import GalleryDetail from "./pages/Gallery/GalleryDetail";
import Projects from "./pages/Projects/Projects";
import ProjectsDetail from "./pages/Projects/ProjectsDetail";
import Events from "./pages/Events/Events";
import EventsDetail from "./pages/Events/EventsDetail";
import Blog from "./pages/Blog/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail/BlogDetail";
import Library from "./pages/Library/Library";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import AdminFormContent from "./components/AdminForm/AdminFormContent/AdminFormContent";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/projectsDescription" element={<Projects />} />
          <Route path="/projectsDescription/:id" element={<ProjectsDetail />} />
          <Route path="/eventsDescription" element={<Events />} />
          <Route path="/eventsDescription/:id" element={<EventsDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/library" element={<Library />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<Login />} />
          <Route
            path="/admin/news"
            element={
              <ProtectedRoute>
                <AdminFormContent contentType="news" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminFormContent contentType="projects" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <AdminFormContent contentType="events" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <AdminFormContent contentType="blog" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <GalleryFormPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

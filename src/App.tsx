import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Submit from './pages/Submit';
import Article from './pages/Article';
import SupremeCourt from './pages/SupremeCourt';
import BoardOfEditors from './pages/BoardOfEditors';
import ExploreByAuthor from './pages/ExploreByAuthor';
import StudentWriting from './pages/StudentWriting';
import AuthorArticles from './pages/AuthorArticles';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/article" element={<Article />} />
              <Route path="/supreme-court" element={<SupremeCourt />} />
              <Route path="/board-of-editors" element={<BoardOfEditors />} />
              <Route path="/explore/author" element={<ExploreByAuthor />} />
              <Route path="/explore/author/:authorName" element={<AuthorArticles />} />
              <Route path="/student-writing" element={<StudentWriting />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
